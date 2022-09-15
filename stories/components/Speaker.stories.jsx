import Speaker from "../../components/Speaker.svg.jsx";

export default {
  title: "Components/Speaker",
  component: Speaker,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  parameters: {
    layout: "centered",
  },
};

const Template = (args) => <Speaker {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  size: 150,
  color: "#115e59",
};
