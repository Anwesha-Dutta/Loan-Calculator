let myChart;
const loanAmountInput =document.querySelector(".loan-amount");
const interestRateInput =document.querySelector(".interest-rate");
const loanTenureInput =document.querySelector(".loan-tenure");

const loanEMIvalue =document.querySelector(".loan-emi .value");
const totalInterestvalue =document.querySelector(".total-interest .value");
const totalAmountvalue =document.querySelector(".total-amount .value");

const calculateBtn =document.querySelector(".calculate-btn");

let loanAmount =parseFloat(loanAmountInput.value);
let interestRate =parseFloat(interestRateInput.value);
let loanTenure =parseFloat(loanTenureInput.value);

let interest = interestRate /12/100;

const displayChart = (totalInterestPayableValue , totalAmount) => {
    const ctx = document.getElementById('myChart').getContext("2d");

  myChart = new Chart(ctx , {
      type: 'pie',
      data: {
        labels: ['Total Interest', 'Principal Loan Amount'],
        datasets: [{
      
          data: [totalInterestPayableValue , totalAmount],
          backgroundColor:["#e63946" ,"#14213d"],

          borderWidth: 0,
        }],
      },
      
 });
};
  const updateChart = (totalInterestPayableValue , totalAmount) =>{

  myChart.data.datasets[0].data[0] = totalInterestPayableValue;
  myChart.data.datasets[0].data[0] = totalAmount;
  myChart.update();
  };


const calculateEMI =() => {
    let emi =
    loanAmount *
    interest *
    (Math.pow(1+interest, loanTenure) / (Math.pow(1+ interest, loanTenure)-1));

    return emi;
};

const updateData = (emi) =>
{
    loanEMIvalue.innerHTML = Math.round(emi);
 
  let totalAmount = Math.round(loanTenure * emi);
  totalAmountvalue.innerHTML =totalAmount;

  let totalInterestPayable = Math.round(totalAmount-loanAmount);
  totalInterestvalue.innerHTML =totalInterestPayable;

  if(myChart)
  {
    updateChart(totalInterestPayable,totalAmount);
  }
  else{
    
  displayChart(totalInterestPayable,totalAmount);
  }


};

const refreshInputValues = () => {
    loanAmount =parseFloat(loanAmountInput.value);
    interestRate =parseFloat(interestRateInput.value);
     loanTenure =parseFloat(loanTenureInput.value);
    
     interest = interestRate /12/100;
};

const init =() =>
{
    refreshInputValues();
   let emi = calculateEMI();
   updateData (emi);
};

init();


calculateBtn.addEventListener("click", init);
