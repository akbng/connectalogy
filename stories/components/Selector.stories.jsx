import Selector from "../../components/Selector";

export default {
  title: "Components/Selector",
  component: Selector,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  parameters: {
    layout: "centered",
  },
};

const Template = (args) => <Selector {...args} />;

export const Main = Template.bind({});
