import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { Chart } from "chart.js/auto";

type DataSet = ComponentFramework.PropertyTypes.DataSet;

export class Pie implements ComponentFramework.StandardControl<IInputs, IOutputs> {
  private chart: Chart<"pie", number[], unknown>;

  constructor() {}

  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary,
    container: HTMLDivElement
  ): void {
    // Add control initialization code

    // Add a canvas element to the container for the chart
    const canvas = document.createElement("canvas");
    container.appendChild(canvas);

    // Initialize the chart with an empty data set
    this.chart = new Chart(canvas, {
      type: "pie",
      data: {
        datasets: [
          {
            data: [],
            backgroundColor: []
          },
        ],
        labels: [],
      },
    });
  }

  public updateView(context: ComponentFramework.Context<IInputs>): void {
    // Get a reference to the canvas element
    const canvas = document.querySelector("canvas");

    if (canvas) {
      // Get the data set from the context
      const dataSet: DataSet = context.parameters.sampleDataSet;

      // Extract the data from the data set and create an array of data objects
      const data = [];
      const backgroundColors = [];
      for (let i = 0; i < dataSet.sortedRecordIds.length; i++) {
        const recordId = dataSet.sortedRecordIds[i];
        const dataObj = {
          label: dataSet.records[recordId].getValue("Data"),
          value: Number(dataSet.records[recordId].getValue("value")),
        };
        data.push(dataObj);

        // Generate a random color for each data point
        const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
          Math.random() * 256
        )}, ${Math.floor(Math.random() * 256)})`;
        backgroundColors.push(color);
      }

      // Update the chart with the new data and colors
      this.chart.data.datasets[0].data = data.map((d) => d.value);
      this.chart.data.labels = data.map((d) => d.label);
      this.chart.data.datasets[0].backgroundColor = backgroundColors;
      this.chart.update();
    }
  }

  public getOutputs(): IOutputs {
    return {};
  }

  public destroy(): void {
    // Add code to cleanup control if necessary
  }
}
