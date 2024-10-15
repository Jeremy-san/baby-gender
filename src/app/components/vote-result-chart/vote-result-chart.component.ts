import { Component, OnInit, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { Chart, ChartType, ChartData, ChartOptions, registerables, PieController, ArcElement, Tooltip, Legend } from 'chart.js';
import { GenderVoteService } from "../../services/gender-vote.service";
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-vote-result-chart',
  standalone: true,
  templateUrl: './vote-result-chart.component.html',
  styleUrls: ['./vote-result-chart.component.scss']
})
export class VoteResultChartComponent implements OnInit {
  participantsCount: number = 0;

  @ViewChild('pieCanvas', { static: true }) pieCanvas!: ElementRef<HTMLCanvasElement>;
  pieChart: Chart<'pie'> | undefined;
  isBrowser: boolean;

  chartType: ChartType = 'pie';
  chartLabels: string[] = ['Garçon', 'Fille'];
  chartData: ChartData<'pie'> = {
    labels: this.chartLabels,
    datasets: [{
      data: [0, 0],
      backgroundColor: ['#42A5F5', '#FF6384'],
      hoverBackgroundColor: ['#64B5F6', '#FF80AB']
    }]
  };

  chartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const dataset = tooltipItem.dataset;
            const total = dataset.data.reduce((sum, value) => sum + value, 0);
            const value = dataset.data[tooltipItem.dataIndex];
            const percentage = ((value / total) * 100).toFixed(1);
            return `${tooltipItem.label}: ${percentage}%`;
          }
        }
      }
    },
    animation: {
      duration: 800,
      easing: 'easeOutBounce'
    }
  };


  constructor(private genderVoteService: GenderVoteService, @Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    // Enregistrer tous les composants Chart.js
    Chart.register(PieController, ArcElement, Tooltip, Legend);

  }

  ngOnInit() {
    this.genderVoteService.getVotes().subscribe((votes: any[]) => {
      const boyVotes = votes.filter(v => v.gender === 'boy').length;
      const girlVotes = votes.filter(v => v.gender === 'girl').length;
      this.participantsCount = votes.length;  // Nombre total de participants
      const totalVotes = boyVotes + girlVotes;


      this.chartData.datasets[0].data = [boyVotes, girlVotes];
      this.chartData.datasets[0].label = totalVotes ? `${(boyVotes / totalVotes * 100).toFixed(1)}%` : '0%';

      this.updateChart();
    });
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      this.createChart();
    }
  }

  createChart() {
    const ctx = this.pieCanvas.nativeElement.getContext('2d');
    if (ctx) {
      this.pieChart = new Chart<'pie'>(ctx, {
        type: 'pie',
        data: this.chartData,
        options: this.chartOptions,
      });
    }
  }

  updateChart() {
    if (this.pieChart) {
      this.pieChart.data = this.chartData;
      this.pieChart.update();
    }
  }
}
