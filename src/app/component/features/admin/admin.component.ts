import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  users: User[] = []
  showModal = false
  editMode = false
  selectedUser: User = { id: 0, email: "", password: "", role: "" }
  loading = false
  currentPage = 1
  itemsPerPage = 10

  private userService = inject(UserService)
  private authService = inject(AuthService)
  private router = inject(Router)

  ngOnInit() {
    this.loadUsers()
  }

  loadUsers() {
    this.loading = true
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users
        this.loading = false
      },
      error: (error) => {
        console.error("Error loading users", error)
        this.loading = false
      },
    })
  }

  openAddUserModal() {
    this.editMode = false
    this.selectedUser = { id: 0, email: "", password: "", role: "" }
    this.showModal = true
  }

  editUser(user: User) {
    this.editMode = true
    this.selectedUser = { ...user }
    this.showModal = true
  }

  saveUser() {
    if (this.editMode) {
      this.userService.updateUser(this.selectedUser).subscribe({
        next: () => {
          this.loadUsers()
          this.closeModal()
        },
        error: (error) => console.error("Error updating user", error),
      })
    } else {
      this.userService.addUser(this.selectedUser).subscribe({
        next: () => {
          this.loadUsers()
          this.closeModal()
        },
        error: (error) => console.error("Error adding user", error),
      })
    }
  }

  deleteUser(id: number) {
    if (confirm("¿Está seguro que desea eliminar este usuario?")) {
      this.userService.deleteUser(id).subscribe({
        next: () => this.loadUsers(),
        error: (error) => console.error("Error deleting user", error),
      })
    }
  }

  closeModal() {
    this.showModal = false
  }

  goToPage(page: number) {
    this.currentPage = page
  }

  nextPage() {
    if (this.currentPage < Math.ceil(this.users.length / this.itemsPerPage)) {
      this.currentPage++
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--
    }
  }

  onLogout() {
    this.authService.logout()
    this.router.navigate(["/login"])
  }

  get paginatedUsers() {
    const start = (this.currentPage - 1) * this.itemsPerPage
    const end = start + this.itemsPerPage
    return this.users.slice(start, end)
  }

  get totalPages() {
    return Math.ceil(this.users.length / this.itemsPerPage)
  }

  getPages() {
    const pages = []
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i)
    }
    return pages
  }
}
