import { TodoItem } from '../../shared/types/todo.js';
import { DatabaseInterface } from './interface.js';

export class MemoryDatabase implements DatabaseInterface {
  private items: Map<string, TodoItem> = new Map();

  async init(): Promise<void> {
    console.log('Using In-Memory Database (No external database required)');
  }

  async teardown(): Promise<void> {
    console.log('In-Memory Database cleared');
    this.items.clear();
  }

  async getItems(): Promise<TodoItem[]> {
    return Array.from(this.items.values()).sort((a, b) => a.name.localeCompare(b.name));
  }

  async getItem(id: string): Promise<TodoItem | null> {
    return this.items.get(id) || null;
  }

  async storeItem(item: TodoItem): Promise<void> {
    this.items.set(item.id, item);
    console.log('Stored item (in-memory):', item);
  }

  async updateItem(id: string, updates: Partial<TodoItem>): Promise<void> {
    const existing = this.items.get(id);
    if (existing) {
      const updated = { ...existing, ...updates };
      this.items.set(id, updated);
      console.log('Updated item (in-memory):', { id, updates });
    }
  }

  async removeItem(id: string): Promise<void> {
    this.items.delete(id);
    console.log('Removed item (in-memory):', id);
  }
}
