import { Component, OnInit } from "@angular/core";
import { RendererService } from "~/services/renderer-service";

@Component({
  selector: "ns-home",
  templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit {
  private rendererService: RendererService;

  constructor() {
    this.rendererService = RendererService.getInstance();
  }

  ngOnInit(): void {
    this.rendererService.initialize();

    // Update example (e.g., on a timer)
    setInterval(() => {
      this.rendererService.update(0.016); // Assume 60 FPS
    }, 16);

    // Set parameter example
    this.rendererService.setParameter(42);

    // Cleanup when the component is destroyed or app closes
    // e.g., use ngOnDestroy lifecycle hook or Android-specific events
  }

  ngOnDestroy(): void {
    this.rendererService.cleanup();
  }
}
