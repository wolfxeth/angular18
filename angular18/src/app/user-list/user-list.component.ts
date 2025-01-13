import { Component, OnInit } from '@angular/core';
import { UserService } from '../user-service.service';
import { CommonModule,NgFor } from '@angular/common';
import { User } from '../modals/User';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  selectedUserId: string | null = null;
  isLoading: boolean = true; // Set to true initially

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

  onHover(userId: string): void {
    this.selectedUserId = userId;
  }

  onLeave(): void {
    this.selectedUserId = null;
  }
}
