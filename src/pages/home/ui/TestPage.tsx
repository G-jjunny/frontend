import { Button } from '@/shared/components/ui/button';

const TestPage = () => {
  return (
    <div>
      <Button variant="default">test</Button>
      <Button variant="destructive">test</Button>
      <Button variant="green">test</Button>
      <Button variant="blue">test</Button>
      <Button variant="outline" className=" ">
        test
      </Button>
      <Button variant="ghost">test</Button>
      <Button variant="secondary">test</Button>
      <Button variant="link">test</Button>
    </div>
  );
};

export default TestPage;
