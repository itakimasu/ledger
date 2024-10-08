"use client";

import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button } from '@mui/material';
import { trpc } from '@/utils/hooks';
import type { AppRouter } from '@/server/routers/_app';

function BudgetTable() {
  const utils = trpc.useUtils();
  const budgetQuery = trpc.budget.listAll.useQuery();
  const increaseSpendingMutation = trpc.budget.increaseSpending.useMutation();

  const [inputValues, setInputValues] = useState<{ [key: number]: number }>({});

  const handleInputChange = (id: number, value: string) => {
    setInputValues({ ...inputValues, [id]: Number(value) });
  };

  const handleIncreaseSpending = (id: number) => {
    const spending = inputValues[id] || 0;
    increaseSpendingMutation.mutate(
      { id, spending },
      {async onSuccess() {
        await utils.budget.listAll.invalidate();
      }}
    );
  };

  if (budgetQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (budgetQuery.isError) {
    return <div>Error: {budgetQuery.error.message}</div>;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Budget</TableCell>
            <TableCell>Spending</TableCell>
            <TableCell>Update</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {budgetQuery.data?.budget.map((budget) => (
            <TableRow key={budget.id}>
              <TableCell>{budget.id}</TableCell>
              <TableCell>{budget.name}</TableCell>
              <TableCell>{budget.budget}</TableCell>
              <TableCell>{budget.spending}</TableCell>
              <TableCell>
                <TextField 
                  label="Update Spending"
                  variant="outlined"
                  size="small"
                  type="number"
                  value={inputValues[budget.id] || ''}
                  onChange={(e) => handleInputChange(budget.id, e.target.value)} 
                />
              </TableCell>
              <TableCell>
                <Button 
                  variant="contained"
                  size="small"
                  onClick={() => handleIncreaseSpending(budget.id)}
                  disabled={increaseSpendingMutation.isLoading}
                >
                  Submit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default BudgetTable;