import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../../models/product.model';
import { ProductService } from '../../../services/product/product.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';

@Component({
  selector: 'app-ente-regulador',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent],
  templateUrl: './ente-regulador.component.html',
  styleUrls: ['./ente-regulador.component.css'],
})
export class EnteReguladorComponent implements OnInit {
  products: Product[] = [];
  paginatedProducts: Product[] = [];
  showModal = false;
  editMode = false;
  selectedProduct: Product = { id: '', name: '', minPrice: 0, maxPrice: 0, zone: '' };
  loading = false;
  currentPage = 1;
  itemsPerPage = 10;
  sortColumn: keyof Product = 'id';
  sortDirection: 'asc' | 'desc' = 'asc';

  private productService = inject(ProductService);
  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.sortProducts();
        this.updatePaginatedProducts();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading products', error);
        this.loading = false;
      },
    });
  }

  sortProducts() {
    this.products.sort((a, b) => {
      const valueA = a[this.sortColumn];
      const valueB = b[this.sortColumn];
      if (valueA === undefined || valueB === undefined) return 0;
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return this.sortDirection === 'asc'
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }
      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return this.sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
      }
      return 0;
    });
    this.updatePaginatedProducts();
  }

  toggleSort(column: keyof Product) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.sortProducts();
  }

  openAddProductModal() {
    this.editMode = false;
    this.selectedProduct = { id: '', name: '', minPrice: 0, maxPrice: 0, zone: '' };
    this.showModal = true;
  }

  editProduct(product: Product) {
    this.editMode = true;
    this.selectedProduct = { ...product };
    this.showModal = true;
  }

  saveProduct() {
    if (!this.selectedProduct.id || !this.selectedProduct.name) {
      alert('Por favor, completa los campos obligatorios (ID y Nombre).');
      return;
    }

    if (this.editMode) {
      this.productService.updateProduct(this.selectedProduct.id, this.selectedProduct).subscribe({
        next: () => {
          this.loadProducts();
          this.closeModal();
        },
        error: (error) => {
          console.error('Error updating product', error);
          alert('Error al actualizar el producto.');
        },
      });
    } else {
      this.productService.addProduct(this.selectedProduct).subscribe({
        next: () => {
          this.loadProducts();
          this.closeModal();
        },
        error: (error) => {
          console.error('Error adding product', error);
          alert('Error al agregar el producto.');
        },
      });
    }
  }

  deleteProduct(id: string) {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.productService.deleteProduct(id).subscribe({
        next: (success) => {
          if (success) {
            this.loadProducts();
          }
        },
        error: (error) => {
          console.error('Error deleting product', error);
        },
      });
    }
  }

  closeModal() {
    this.showModal = false;
  }

  viewProduct(id: string) {
    this.router.navigate([`/product/${id}`]);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updatePaginatedProducts();
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedProducts();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedProducts();
    }
  }

  updatePaginatedProducts() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedProducts = this.products.slice(start, end);
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  get totalPages() {
    return Math.ceil(this.products.length / this.itemsPerPage);
  }

  getPages() {
    const pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  get paginationInfo() {
    const start = (this.currentPage - 1) * this.itemsPerPage + 1;
    const end = Math.min(this.currentPage * this.itemsPerPage, this.products.length);
    return `${start} - ${end} of ${this.products.length}`;
  }
}