import { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import * as XLSX from 'xlsx';
import '../css/ChartPage.css';

export default function ChartPage() {
  const [navData, setNavData] = useState([]);
  const [startDate, setStartDate] = useState('2019-01-01');
  const [endDate, setEndDate] = useState('2024-04-24');
  const [chartOptions, setChartOptions] = useState(null);

  useEffect(() => {

    fetch('/React Assignment Historical NAV Report.xlsx')
      .then(res => res.arrayBuffer())
      .then(buffer => {
        const workbook = XLSX.read(buffer, { type: 'array' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(sheet, { range: 5 });

        console.log("===========>", data);

        const parsed = data
          .map(row => {
            const rawDate = row['NAV Date'];
            const rawNav = row['NAV (Rs)'];

            if (!rawDate || !rawNav) return null;

            let date;

            if (typeof rawDate === 'number') {
              date = new Date(Math.round((rawDate - 25569) * 86400 * 1000));
            } else {
              date = new Date(rawDate);
            }

            const nav = parseFloat(rawNav);
            if (isNaN(date.getTime()) || isNaN(nav)) return null;

            return { date, nav };
          })
          .filter(Boolean);




        // console.log("Parsed NAV Data:", parsed);
        setNavData(parsed);
      });
  }, []);

  useEffect(() => {
    const filtered = navData.filter(d => {
      const date = new Date(d.date);
      return date >= new Date(startDate) && date <= new Date(endDate);
    });

    const dates = filtered.map(d => d.date.toISOString().split('T')[0]);
    const navs = filtered.map(d => d.nav);

    setChartOptions({
      title: { text: '' },
      xAxis: { categories: dates },
      series: [{ name: 'NAV (Rs)', data: navs }]

    });
  }, [navData, startDate, endDate]);

  return (
    <div className="chart">
      <h2 className="table-heading">Trading Returns</h2>
      <table className="trading-returns">
        <thead>
          <tr>
            <th>Name</th>
            <th>YTD</th>
            <th>1D</th>

            <th>1W</th>
            <th>1M</th>
            <th>3M</th>
            <th>6M</th>

            <th>1Y</th>
            <th>2Y</th>
            <th>3Y</th>
            <th>SI</th>
            <th>DD</th>
            <th>MAXDD</th>

          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Focused</td>
            <td>0.2%</td>
            <td>1.7%</td>
            <td>6.2%</td>
            <td>12.6%</td>
            <td>23.3%</td>
            <td>21.5%</td>
            <td>22.4%</td>
            <td>13.6%</td>
            <td>13.4%</td>
            <td>13.6%</td>
            <td>13.4%</td>
            <td>0.9%</td>

          </tr>
          <tr>
            <td>NIFTY</td>
            <td>-0.2%</td>
            <td>1.6%</td>
            <td>6.6%</td>
            <td>13.4%</td>
            <td>22.4%</td>
            <td>13.3%</td>
            <td>14.6%</td>
            <td>11.4%</td>
            <td>11.2%</td>
            <td>13.6%</td>
            <td>13.4%</td>
            <td>0.9%</td>

          </tr>
          <tr>
            <td>Difference</td>
            <td>0.4%</td>
            <td>0.1%</td>
            <td>-0.4%</td>
            <td>-0.8%</td>
            <td>0.9%</td>
            <td>8.2%</td>
            <td>7.8%</td>
            <td>2.2%</td>
            <td>2.2%</td>
            <td>13.6%</td>
            <td>13.4%</td>
            <td>0.9%</td>

          </tr>
        </tbody>
      </table>


      <div className="chart-header">
        <h2>Equity Curve</h2>
        <div className="date-selector">
          <label>Start Date:</label>
          <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
          <label>End Date:</label>
          <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
        </div>
      </div>

      <div className="chart-container">
        {chartOptions && <HighchartsReact highcharts={Highcharts} options={chartOptions} />}
      </div>


    </div>
  );
}
