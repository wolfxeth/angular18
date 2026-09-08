import { Component, OnInit } from '@angular/core';
import { UserService } from '../user-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../modals/User';

const AVATAR_PALETTE = [
  'linear-gradient(135deg, #7c5cff, #22d3ee)',
  'linear-gradient(135deg, #ff5cad, #7c5cff)',
  'linear-gradient(135deg, #22d3ee, #34d399)',
  'linear-gradient(135deg, #f59e0b, #ff5cad)',
  'linear-gradient(135deg, #34d399, #22d3ee)',
  'linear-gradient(135deg, #f472b6, #7c5cff)',
];

@Component({
  selector: 'app-user-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  selectedUserId: string | null = null;
  isLoading: boolean = true; // Set to true initially
  searchQuery: string = '';
  copiedUserId: string | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      (data: User[]) => {
        this.users = data.sort((a, b) => a.name.localeCompare(b.name));
        this.isLoading = false; // Set isLoading to false when data is fetched
      },
      (error: any) => {
        console.error('Error fetching users:', error);
        this.isLoading = false; // Handle error case by setting isLoading to false
      }
    );
  }

  get filteredUsers(): User[] {
    const query = this.searchQuery.trim().toLowerCase();
    if (!query) {
      return this.users;
    }
    return this.users.filter(
      (user) =>
        user.name?.toLowerCase().includes(query) || user.email?.toLowerCase().includes(query)
    );
  }

  toggleUser(userId: string): void {
    this.selectedUserId = this.selectedUserId === userId ? null : userId;
  }

  getInitials(name: string): string {
    return (name || '?')
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join('');
  }

  getAvatarGradient(name: string): string {
    let hash = 0;
    for (let i = 0; i < (name || '').length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return AVATAR_PALETTE[Math.abs(hash) % AVATAR_PALETTE.length];
  }

  copyEmail(event: Event, user: User): void {
    event.stopPropagation();
    navigator.clipboard?.writeText(user.email).then(() => {
      this.copiedUserId = user.id;
      setTimeout(() => {
        if (this.copiedUserId === user.id) {
          this.copiedUserId = null;
        }
      }, 1500);
    });
  }
}
