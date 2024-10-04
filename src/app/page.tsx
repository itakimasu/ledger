// import Image from "next/image";
import PageHeader from "@/components/Header";
import BudgetItem from "@/components/BudgetItem"

export default function Home() {
  return (
    <div>
      <PageHeader />
      <h2>Reoccuring</h2>
      <BudgetItem budget="100" spending="50" />
      <h2>Variable</h2>
    </div>
  );
}
