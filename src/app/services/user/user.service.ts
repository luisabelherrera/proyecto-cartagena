import { Injectable, signal } from "@angular/core"
import { type Observable, of, throwError } from "rxjs"
import { delay } from "rxjs/operators"
import type { User } from "../../models/user.model"

@Injectable({
  providedIn: "root",
})
export class UserService {
  private _users = signal<User[]>([
    { id: 795876, email: "a.kelley@gmail.com", password: "password123", role: "Turista" },
    { id: 65786, email: "jaiden.ng@gmail.com", password: "password123", role: "Administrador" },
    { id: 895768, email: "ace.fuj@yahoo.com", password: "password123", role: "Comercio" },
    { id: 989759, email: "nikolai.schmidt1994@outlook.com", password: "password123", role: "Administrador" },
    { id: 85687965, email: "meg@upton.com", password: "password123", role: "Turista" },
    { id: 86060976, email: "prince.chen1997@gmail.com", password: "password123", role: "Comercio" },
    { id: 7980679, email: "reece@yahoo.com", password: "password123", role: "Turista" },
    { id: 9608795, email: "anastasia.spring@mcdonaldt2.com", password: "password123", role: "Comercio" },
    { id: 87698759, email: "Mo.boyd@gmail.com", password: "password123", role: "Administrador" },
    { id: 69875987, email: "Kailee.thomas@gmail.com", password: "password123", role: "Administrador" },
  ])

  getUsers(): Observable<User[]> {
    return of(this._users()).pipe(delay(300)) 
  }

  getUserById(id: number): Observable<User> {
    const user = this._users().find((u) => u.id === id)
    if (user) {
      return of(user).pipe(delay(300))
    }
    return throwError(() => new Error("Usuario no encontrado"))
  }

  addUser(user: User): Observable<User> {
    const newId = Math.floor(Math.random() * 90000000) + 10000000
    const newUser = { ...user, id: newId }

    this._users.update((users) => [...users, newUser])
    return of(newUser).pipe(delay(300))
  }

  updateUser(user: User): Observable<User> {
    const index = this._users().findIndex((u) => u.id === user.id)
    if (index !== -1) {
      this._users.update((users) => {
        const updatedUsers = [...users]
        updatedUsers[index] = user
        return updatedUsers
      })
      return of(user).pipe(delay(300))
    }
    return throwError(() => new Error("Usuario no encontrado"))
  }

  deleteUser(id: number): Observable<boolean> {
    const index = this._users().findIndex((u) => u.id === id)
    if (index !== -1) {
      this._users.update((users) => users.filter((u) => u.id !== id))
      return of(true).pipe(delay(300))
    }
    return throwError(() => new Error("Usuario no encontrado"))
  }
}
