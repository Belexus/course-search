import { FC } from "react";
import { Layout } from "../../components/Layout";
import { Search } from "../../components/Search";

/**
 * Course page
 *
 * @returns JSX component
 */
export const Course: FC = () => {
  return (
    <Layout>
      <Search />
    </Layout>
  );
};
