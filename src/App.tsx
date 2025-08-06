type DemoProps = {
  name: string;
  age: number;
};

const Demo = ({ name, age }: DemoProps): JSX.Element => {
  return (
    <div>
      <h2>Demo</h2>
      <div>이름: {name}</div>
      <div>나이: {age}</div>
    </div>
  );
};

type SampleProps = {
  children?: React.ReactNode;
  title: string;
};
const Sample = ({ children, title }: SampleProps): JSX.Element => {
  return (
    <div>
      <h2>Sample</h2>
      <div>{title}</div>
      <div>{children}</div>
    </div>
  );
};

const App = (): JSX.Element => {
  return (
    <div>
      <h1>App</h1>
      <Sample title="이것은 Props 중 title 입니다.">
        <p>나는 Children 입니다.</p>
      </Sample>
    </div>
  );
};

export default App;
