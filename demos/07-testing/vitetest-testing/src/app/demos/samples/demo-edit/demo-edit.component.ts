import { Component, ChangeDetectionStrategy } from "@angular/core";
import { MatButton } from "@angular/material/button";
import { MatInput } from "@angular/material/input";
import { MatFormField } from "@angular/material/form-field";
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatCardActions } from "@angular/material/card";

@Component({
  selector: "app-demo-edit",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./demo-edit.component.html",
  styleUrls: ["./demo-edit.component.scss"],
  standalone: true,
  imports: [MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatFormField, MatInput, MatCardActions, MatButton]
})
export class DemoEditComponent {
  saveItem() { }
}
