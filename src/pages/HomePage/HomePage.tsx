import React from "react";
import Autocomplete from "../../components/Autocomplete";
import Container from "../../components/Container";
import Logo from "../../components/Logo";
import "./style.scss";

const HomePage: React.FC = () => {
  return (
    <div className="homepage-container">
      <Logo />
      <Container>
        {({ searchValue, onSearchChange, articles }) => (
          <Autocomplete
            searchValue={searchValue}
            onSearchChange={onSearchChange}
            articles={articles}
          />
        )}
      </Container>
    </div>
  );
};

export default HomePage;
