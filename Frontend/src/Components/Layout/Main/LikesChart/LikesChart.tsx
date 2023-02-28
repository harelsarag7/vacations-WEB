import "./LikesChart.css";
import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
// import faker from 'faker';
import { vacationsFunctions } from '../../../../Services/vacations';
import { vacationModel } from '../../../../Models/vacationModel';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";




export default function LikesChart(): JSX.Element {
    const [vacations, setVacations] = useState<vacationModel[] | undefined>([])
    const userRedux = useSelector((state: any) => state.auth)
    
        useEffect(() => {
          if(userRedux?.role === "ADMIN") {
            vacationsFunctions.getVacationsLikes().then((res) => setVacations(res));
            
          } 
        }, []);


        function downloadToCSV() {
          if (vacations) {
            const csvData = vacations.map((vacation) => ({
              destination: vacation.destination,
              followers: vacation.totalLikes,
            }));
        
            const csvString =
              Object.keys(csvData[0]).join(",") +
              "\n" +
              csvData.map((obj) => Object.values(obj).join(",")).join("\n");
        
            const blob = new Blob([csvString], { type: "text/csv" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.download = "harel vacations.csv";
            link.href = url;
            link.click();
          } else {
            console.log("There are no vacations to download.");
          }
        }


     const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top' as const,
        },
        title: {
          display: true,
          text: 'Likes of Vacations',
        },
      },
    };
    
    
    const labels =  vacations?.map(item => item.destination + " " + item.id);
    
 const data = {
      labels,
      datasets: [
          {
              label: 'Vacation Likes',
              data:  vacations?.map(vac => vac.totalLikes),
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        // {
            //   label: 'Dataset 2',
            //   data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            //   backgroundColor: 'rgba(53, 162, 235, 0.5)',
            // },
        ],
    };
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
      );
  return (
    <div className='LikesChart'>
    {userRedux?.role === "ADMIN" ?
    <div className="LikesChartContainer">
      <Bar options={options} data={data} />
      <button onClick={downloadToCSV}>Download to CSV file</button>
    </div>
    : <div className="not_allowed_text"> You are not Allowed to See the Likes stats. </div>}
      </div>
      )
}
