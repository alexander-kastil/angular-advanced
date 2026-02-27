import { Component } from "@angular/core";
import { MarkdownRendererComponent } from "../../../shared/markdown-renderer/markdown-renderer.component";

@Component({
    selector: "app-unit-testing",
    templateUrl: "./unit-testing.component.html",
    styleUrls: ["./unit-testing.component.scss"],
    imports: [MarkdownRendererComponent]
})
export class UnitTestingComponent {

}
