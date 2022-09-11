import Timer from "../../components/Timer";

export default {
  title: "Components/Timer",
  component: Timer,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  parameters: {
    layout: "centered",
  },
};

const Template = (args) => <Timer {...args} />;

export const Large = Template.bind({});
Large.args = {
  time: 100,
  size: 400,
};

export const small = Template.bind({});
small.args = {
  time: 10,
  size: 200,
  color: "#fd6464",
};
