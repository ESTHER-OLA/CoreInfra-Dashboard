"use client";

import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export function CardStatusChart() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    // Sample data
    const data = {
      labels: ["Active", "Expired", "Inactive", "Blocked", "Lost"],
      datasets: [
        {
          data: [65, 15, 10, 5, 5],
          backgroundColor: [
            "#01A4AF", // Active - teal
            "#FFBA24", // Expired - amber
            "#014DAF", // Inactive - blue
            "#8020E7", // Blocked - purple
            "#FF4457", // Lost - red
          ],
          borderWidth: 0,
          cutout: "75%",
        },
      ],
    };

    chartInstance.current = new Chart(ctx, {
      type: "doughnut",
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            align: "center",
            labels: {
              usePointStyle: true,
              boxWidth: 8,
              padding: 20,
            },
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || "";
                const value = context.raw;
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const percentage = Math.round((value / total) * 100);
                return `${label}: ${percentage}%`;
              },
            },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="relative h-[250px] w-[400px]">
      <canvas ref={chartRef} />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-sm text-gray-500">Total Cards</div>
        <div className="text-2xl font-bold">2,450</div>
      </div>
    </div>
  );
}
