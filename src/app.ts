const Autobind = (_: any, _2: string, descriptor: PropertyDescriptor) => {
    const descValue = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
            const newValue = descValue.bind(this);
            return newValue;
        }
    }
    return adjDescriptor;
}

class Note {
    hostElement: HTMLDivElement;

    constructor(
        private title: string, 
        private description: string,
    ){
        this.hostElement = document.querySelector('.notes-section') as HTMLDivElement;
        
        this.createNote(this.hostElement);
    }

    createNote(hostEl: HTMLDivElement){
        const randomColor = this.randomColor();
        const newNote = document.createElement('div');
        newNote.classList.add('note');
        newNote.setAttribute('draggable', 'true')
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

    randomColor(){
        const color = Math.floor(Math.random() * 16777215).toString(16);
        return color;
    }

    dragStart(e: DragEvent){
        const target = e.target as HTMLDivElement;
        target.classList.add('dragging');
    }

    dragEnd(e: DragEvent){
        const target = e.target as HTMLDivElement;
        target.classList.remove('dragging');
    }
    
    dragOver(e: DragEvent){
        e.preventDefault();
    }

    dropNote(e: DragEvent){
        e.preventDefault();
        
        const draggedNote = document.querySelector('.dragging')!;
        draggedNote.remove();
    }
}

class App {
    static removeNoteBtn: HTMLElement;
    addNoteBtn: HTMLElement;
    noteForm: HTMLElement;
    shadowBg: HTMLDivElement;
    
    constructor(){
        App.removeNoteBtn = document.querySelector('.fa-trash-can') as HTMLElement;
        this.addNoteBtn = document.querySelector('.fa-file-circle-plus') as HTMLElement;
        this.noteForm = document.querySelector('.note-form') as HTMLDivElement;
        this.shadowBg = document.querySelector('.shadow-bg') as HTMLDivElement;
        
        const confirmAddBtn = document.querySelector('.confirm-add') as HTMLButtonElement;

        confirmAddBtn.addEventListener('click', this.addNote);

        this.addNoteBtn.addEventListener('click', () => {
            this.showAdding(this.noteForm)
        });
        this.shadowBg.addEventListener('click', () => {
            this.hideAdding(this.noteForm);
        });
    }

    showAdding(el: HTMLElement){
        el.classList.remove('hide-form');
    }

    hideAdding(el: HTMLElement){
        el.classList.add('hide-form');
    }

    @Autobind
    addNote(e: MouseEvent){
        e.preventDefault();

        const titlePlace = document.querySelector('.title-input') as HTMLInputElement;
        const descPlace = document.querySelector('.desc-input') as HTMLTextAreaElement;
        const errorPlace = document.querySelector('.adding-error') as HTMLParagraphElement;

        const title = titlePlace.value;
        const desc = descPlace.value;

        if(title.length!==0 && desc.length!==0){
            new Note(title, desc);

            titlePlace.value = '';
            descPlace.value = '';
            errorPlace.textContent = '';
            this.hideAdding(this.noteForm);
        } else {
            errorPlace.textContent = "Text fields can't be empty!";
        }
    }
}

new App();

//TODO:
// responsywna strona