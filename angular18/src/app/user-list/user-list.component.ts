import { Component, OnInit } from '@angular/core';
import { User, UserService } from '../user-service.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-user-list',
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  selectedUserId: string | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  onHover(userId: string): void {
    this.selectedUserId = userId;
  }

  onLeave(): void {
    this.selectedUserId = null;
  }
}
