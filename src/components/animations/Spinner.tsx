import { CirclesWithBar, Puff, RevolvingDot } from "react-loader-spinner";

interface SpinnerProps {
  name: string;
  title?: string;
  className?: string;
}

const Spinner = ({ name, title, className }: SpinnerProps) => {
  if (name === "CirclesWithBar") {
    return (
      <>
        <p>{title ?? ""}</p>
        <CirclesWithBar
          wrapperClass=""
          height={100}
          color="rgb(253,244,255)"
          barColor="rgb(162,28,175)"
        />
      </>
    );
  } else if (name === "Puff") {
    return (
      <>
        <p>{title ?? ""}</p>
        <Puff
          height="100"
          width="100"
          radius={10}
          color="#4fa94d"
          ariaLabel="puff-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </>
    );
  } else {
    return (
      <>
        <p>{title ?? ""}</p>
        <RevolvingDot
          height="100"
          width="100"
          color="#4fa94d"
          secondaryColor=""
          ariaLabel="revolving-dot-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </>
    );
  }
};

export default Spinner;
