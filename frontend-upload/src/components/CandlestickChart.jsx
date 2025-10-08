import React, { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  TimeScale,
  Tooltip,
  Legend
} from 'chart.js';
import { CandlestickController, CandlestickElement } from 'chartjs-chart-financial';
import 'chartjs-adapter-date-fns';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  CandlestickController,
  CandlestickElement,
  Tooltip,
  Legend
);

const CandlestickChart = ({ data, currentPrice, height = 400 }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!chartRef.current || !data || data.length === 0) return;

    const ctx = chartRef.current.getContext('2d');

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Format data for Chart.js financial
    const formattedData = data.map(candle => ({
      x: candle.timestamp,
      o: candle.open,
      h: candle.high,
      l: candle.low,
      c: candle.close
    }));

    // Create new chart
    chartInstance.current = new ChartJS(ctx, {
      type: 'candlestick',
      data: {
        datasets: [{
          label: 'Price',
          data: formattedData,
          borderColor: {
            up: '#0ECB81',
            down: '#F6465D',
            unchanged: '#848E9C'
          },
          backgroundColor: {
            up: '#0ECB81',
            down: '#F6465D',
            unchanged: '#848E9C'
          },
          color: {
            up: '#0ECB81',
            down: '#F6465D',
            unchanged: '#848E9C'
          }
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          intersect: false,
          mode: 'index'
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: true,
            backgroundColor: 'rgba(30, 35, 41, 0.95)',
            titleColor: '#F0B90B',
            bodyColor: '#FFFFFF',
            borderColor: '#2B3139',
            borderWidth: 1,
            padding: 12,
            displayColors: false,
            callbacks: {
              title: (context) => {
                const date = new Date(context[0].parsed.x);
                return date.toLocaleString();
              },
              label: (context) => {
                const data = context.raw;
                return [
                  `Open: $${data.o.toFixed(4)}`,
                  `High: $${data.h.toFixed(4)}`,
                  `Low: $${data.l.toFixed(4)}`,
                  `Close: $${data.c.toFixed(4)}`
                ];
              }
            }
          }
        },
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'hour',
              displayFormats: {
                hour: 'HH:mm',
                day: 'MMM dd'
              }
            },
            grid: {
              color: '#2B3139',
              drawBorder: false
            },
            ticks: {
              color: '#848E9C',
              maxRotation: 0,
              autoSkip: true,
              maxTicksLimit: 8
            }
          },
          y: {
            position: 'right',
            grid: {
              color: '#2B3139',
              drawBorder: false
            },
            ticks: {
              color: '#848E9C',
              callback: function(value) {
                return '$' + value.toFixed(4);
              }
            }
          }
        }
      }
    });

    // Add current price line annotation if available
    if (currentPrice && chartInstance.current) {
      // Chart.js doesn't have built-in price lines, but we can add it via a plugin
      // For now, we'll skip this feature or you can add chartjs-plugin-annotation
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, currentPrice]);

  return (
    <div style={{ width: '100%', height: `${height}px`, position: 'relative' }}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default CandlestickChart;
