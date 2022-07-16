"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const Autobind = (_, _2, descriptor) => {
    const descValue = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        get() {
            const newValue = descValue.bind(this);
            return newValue;
        }
    };
    return adjDescriptor;
};
class Note {
    constructor(title, description) {
        this.title = title;
        this.description = description;
        this.hostElement = document.querySelector('.notes-section');
        this.createNote(this.hostElement);
    }
    createNote(hostEl) {
        const randomColor = this.randomColor();
        const newNote = document.createElement('div');
        newNote.classList.add('note');
        newNote.setAttribute('draggable', 'true');
        newNote.style.backgroundColor = `#${randomColor}`;
        newNote.innerHTML = `
        <h2>${this.title}</h2>
        <hr>
        <p>${this.description}</p>`;
        newNote.addEventListener('dragstart', this.dragStart);
        newNote.addEventListener('dragend', this.dragEnd);
        App.removeNoteBtn.addEventListener('dragover', this.dragOver);
        document.addEventListener('drop', this.dropNote);
        hostEl.appendChild(newNote);
    }
    randomColor() {
        const color = Math.floor(Math.random() * 16777215).toString(16);
        return color;
    }
    dragStart(e) {
        const target = e.target;
        target.classList.add('dragging');
    }
    dragEnd(e) {
        const target = e.target;
        target.classList.remove('dragging');
    }
    dragOver(e) {
        e.preventDefault();
    }
    dropNote(e) {
        e.preventDefault();
        const draggedNote = document.querySelector('.dragging');
        draggedNote.remove();
    }
}
class App {
    constructor() {
        App.removeNoteBtn = document.querySelector('.fa-trash-can');
        this.addNoteBtn = document.querySelector('.fa-file-circle-plus');
        this.noteForm = document.querySelector('.note-form');
        this.shadowBg = document.querySelector('.shadow-bg');
        const confirmAddBtn = document.querySelector('.confirm-add');
        confirmAddBtn.addEventListener('click', this.addNote);
        this.addNoteBtn.addEventListener('click', () => {
            this.showAdding(this.noteForm);
        });
        this.shadowBg.addEventListener('click', () => {
            this.hideAdding(this.noteForm);
        });
    }
    showAdding(el) {
        el.classList.remove('hide-form');
    }
    hideAdding(el) {
        el.classList.add('hide-form');
    }
    addNote(e) {
        e.preventDefault();
        const titlePlace = document.querySelector('.title-input');
        const descPlace = document.querySelector('.desc-input');
        const errorPlace = document.querySelector('.adding-error');
        const title = titlePlace.value;
        const desc = descPlace.value;
        if (title.length !== 0 && desc.length !== 0) {
            new Note(title, desc);
            titlePlace.value = '';
            descPlace.value = '';
            errorPlace.textContent = '';
            this.hideAdding(this.noteForm);
        }
        else {
            errorPlace.textContent = "Text fields can't be empty!";
        }
    }
}
__decorate([
    Autobind
], App.prototype, "addNote", null);
new App();
//TODO:
// responsywna strona
