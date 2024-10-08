import { trpc } from '@/utils/hooks';
import PageHeader from '@/components/Header';
import BudgetList from '@/components/BudgetItem';

export default function IndexPage() {
  const hello = trpc.hello.useQuery({ text: 'world' });
  if (!hello.data) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <PageHeader />
      <p>{hello.data.greeting}</p>
      <BudgetList/>
    </div>
  );
}