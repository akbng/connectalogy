import Ring from "../../components/Ring.svg.jsx";

export default {
  title: "Components/Ring",
  component: Ring,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  parameters: {
    layout: "centered",
  },
  args: {
    color: "#333",
  },
  argTypes: {
    ringOffset: { control: { type: "range", min: 0, max: 750, step: 10 } },
  },
};

const Template = (args) => <Ring {...args} />;

export const Large = Template.bind({});
Large.args = {
  size: 500,
  ringOffset: 0,
};

export const small = Template.bind({});
small.args = {
  size: 200,
  color: "#fd6464",
  ringOffset: 0,
};

export const offset = Template.bind({});
offset.args = {
  size: 350,
  ringOffset: 150,
};
