import React, { useEffect, useState } from "react";
import inputTypes from "../constants/inputTypes";
import {
  incomeCategories,
  expenseCategories,
  loanCategories,
} from "../constants/inputCategories";
import SelectInput from "./SelectInput";

const UserInput = ({ setTotalBudgetAmount }) => {
  //INPUT TYPE STATE VARIABLE
  const [transactionType, setTransactionType] = useState("income");

  //INPUT CATEGORY STATE VARIABLE
  const [transactionCategory, setTransactionCategory] = useState("job");

  //INPUT CATEGORY OPTIONS STATE VARIABLE
  const [categoryOptions, setCategoryOptions] = useState(incomeCategories);

  //USE-EFFECT
  useEffect(() => {
    transactionType === "income"
      ? setCategoryOptions(incomeCategories)
      : transactionType === "expense"
      ? setCategoryOptions(expenseCategories)
      : setCategoryOptions(loanCategories);
  }, [transactionType]);

  //TRANSACTION SUBMIT || FORM SUBMISSION
  const transactionSubmitHandler = (e) => {
    e.preventDefault();

    //INPUT DATA
    let history = {
      amount: e.target[0].value,
      inputType: e.target[1].value,
      inputCategory: transactionCategory,
    };

    //ADD DATA TO LOCALSTORAGE
    localStorage.setItem(Math.random(), JSON.stringify(history));

    //GET AND UPDATE TOTAL BUDGET
    let totalBudget = Number(localStorage.getItem("Total Budget Amount"));
    if (history.inputType === "income" || history.inputType === "loan") {
      totalBudget += Number(history.amount);
      localStorage.setItem("Total Budget Amount", totalBudget);
      setTotalBudgetAmount(totalBudget);
    } else {
      totalBudget -= Number(history.amount);
      localStorage.setItem("Total Budget Amount", totalBudget);
      setTotalBudgetAmount(totalBudget);
    }
  };

  return (
    <React.Fragment>
      {/* AMOUNT OF MONEY */}
      <form className="m-2" onSubmit={transactionSubmitHandler}>
        <div>
          <label className="form-label">Amount</label>
        </div>

        <div>
          <input
            className="form-control me-5 ms-1 mb-2"
            type="number"
            placeholder="Enter amount of money"
          />
        </div>
        <label className="form-label">Transaction Type</label>
        <div className="mb-2">
          <SelectInput
            options={inputTypes}
            updateFunction={setTransactionType}
          />
        </div>
        <div>
          <SelectInput
            options={categoryOptions}
            updateFunction={setTransactionCategory}
          />
        </div>

        <button type="submit" className="btn btn-primary mt-3 ms-2">
          Submit
        </button>
      </form>
    </React.Fragment>
  );
};

export default UserInput;
