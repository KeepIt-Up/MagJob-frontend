import { Component, EventEmitter, Output, inject } from "@angular/core";
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";

type DocumentFilterForm = FormGroup<{
    searchTerm: FormControl<string>;
  }>;

@Component({
    selector: 'app-filter-documents',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './filter-documents.component.html',
    styleUrls: ['./filter-documents.component.css']
})

export class FilterDocumentsComponent {
    private formBuilder = inject(NonNullableFormBuilder);

    @Output() requestFilterRefreshEvent = new EventEmitter<string>();

    form: DocumentFilterForm = this.formBuilder.group({
        searchTerm: this.formBuilder.control<string>('', Validators.required)
    });

    ngOnInit() {
        this.form.valueChanges.subscribe(() => {
          this.sendUpdatedParams(this.form.value.searchTerm!);
        });
    }

    sendUpdatedParams(searchTerm: string) {
        this.requestFilterRefreshEvent.emit(searchTerm);
    }

}