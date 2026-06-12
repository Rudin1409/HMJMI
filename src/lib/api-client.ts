const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

class ApiClient {
  private getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('hmjmi_token');
    }
    return null;
  }

  setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('hmjmi_token', token);
    }
  }

  clearToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('hmjmi_token');
    }
  }

  async request<T = any>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const headers = new Headers(options.headers || {});
    headers.set('Accept', 'application/json');
    
    // Set content-type to JSON unless we are sending FormData (like image upload)
    if (!(options.body instanceof FormData) && !headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }

    const token = this.getToken();
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    const config: RequestInit = {
      ...options,
      headers,
    };

    const response = await fetch(`${API_URL}${endpoint}`, config);

    if (response.status === 401) {
      this.clearToken();
      if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/login')) {
        window.location.href = '/login';
      }
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Terjadi kesalahan pada server.');
    }

    return data;
  }

  // Auth Endpoints
  async login(email: string, password: string) {
    const res = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (res.token) {
      this.setToken(res.token);
    }
    return res;
  }

  async logout() {
    try {
      await this.request('/auth/logout', { method: 'POST' });
    } finally {
      this.clearToken();
    }
  }

  async getMe() {
    return this.request('/auth/me');
  }

  async updateProfile(username: string, avatar?: string) {
    return this.request('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify({ username, avatar }),
    });
  }

  async updatePassword(password: string) {
    return this.request('/auth/password', {
      method: 'PUT',
      body: JSON.stringify({ password }),
    });
  }

  // Users Management
  async getUsers() {
    return this.request('/users');
  }

  async createUser(data: any) {
    return this.request('/users', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Posts (Berita Acara)
  async getPosts(status?: 'draft' | 'published') {
    const query = status ? `?status=${status}` : '';
    return this.request(`/berita-acara${query}`);
  }

  async getPost(id: string) {
    return this.request(`/berita-acara/${id}`);
  }

  async createPost(data: any) {
    return this.request('/berita-acara', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updatePost(id: string, data: any) {
    return this.request(`/berita-acara/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deletePost(id: string) {
    return this.request(`/berita-acara/${id}`, {
      method: 'DELETE',
    });
  }

  async likePost(id: string) {
    return this.request(`/berita-acara/${id}/like`, {
      method: 'POST',
    });
  }

  // Comments
  async getPostComments(postId: string) {
    return this.request(`/berita-acara/${postId}/comments`);
  }

  async createComment(postId: string, author: string, content: string) {
    return this.request(`/berita-acara/${postId}/comments`, {
      method: 'POST',
      body: JSON.stringify({ author, content }),
    });
  }

  async getComments() {
    return this.request('/comments');
  }

  async updateComment(id: string, data: { status: 'pending' | 'approved' | 'rejected'; content?: string }) {
    return this.request(`/comments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteComment(id: string) {
    return this.request(`/comments/${id}`, {
      method: 'DELETE',
    });
  }

  // Analytics
  async incrementVisit() {
    return this.request('/analytics/visit', { method: 'POST' });
  }

  async getStats() {
    return this.request('/analytics/stats');
  }

  async getDailyVisits(days = 7) {
    return this.request(`/analytics/daily-visits?days=${days}`);
  }

  async getPopularity() {
    return this.request('/analytics/popularity');
  }

  // Upload File
  async uploadImage(file: File) {
    const formData = new FormData();
    formData.append('image', file);
    const res = await this.request('/upload', {
      method: 'POST',
      body: formData,
    });
    return res.url; // Returns the uploaded image public URL
  }

  // Gallery Items Management
  async getGalleryItems(category?: string) {
    const query = category ? `?category=${category}` : '';
    return this.request(`/gallery-items${query}`);
  }

  async getGalleryItem(id: number | string) {
    return this.request(`/gallery-items/${id}`);
  }

  async createGalleryItem(formData: FormData) {
    return this.request('/gallery-items', {
      method: 'POST',
      body: formData,
    });
  }

  async updateGalleryItem(id: number | string, formData: FormData) {
    return this.request(`/gallery-items/${id}`, {
      method: 'POST', // Use POST for multipart/form-data upload compatibility
      body: formData,
    });
  }

  async deleteGalleryItem(id: number | string) {
    return this.request(`/gallery-items/${id}`, {
      method: 'DELETE',
    });
  }

  async reorderGalleryItems(items: { id: number; order_index: number }[]) {
    return this.request('/gallery-items/reorder', {
      method: 'PUT',
      body: JSON.stringify({ items }),
    });
  }
}

export const api = new ApiClient();
