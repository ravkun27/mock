import React from "react";
import {
  Header,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  HeaderGlobalBar,
  Button,
} from "carbon-components-react";
import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <Header aria-label="MyApp Navbar" style={{ backgroundColor: "#fff", height: "64px" }}>
      {/* Logo */}
      <HeaderName
        href="/"
        prefix=""
        style={{
          marginLeft: "2rem",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <img
          src={logo}
          alt="MyApp Logo"
          style={{ height: "32px", verticalAlign: "middle" }}
        />
      </HeaderName>

      {/* Navigation */}
      <HeaderNavigation
        aria-label="Main Navigation"
        style={{
          marginLeft: "2rem",
          gap: "1rem",
          display: "flex",
          alignItems: "center",
        }}
      >
        <HeaderMenuItem href="/features">Features</HeaderMenuItem>
        <HeaderMenuItem href="/pricing">Pricing</HeaderMenuItem>
        <HeaderMenuItem href="/solutions">Solutions</HeaderMenuItem>
        <HeaderMenuItem href="/resources">Resources</HeaderMenuItem>
        <HeaderMenuItem href="/blog">Blog</HeaderMenuItem>
      </HeaderNavigation>

      {/* Actions */}
      <HeaderGlobalBar
        style={{
          marginLeft: "auto",
          marginRight: "2rem",
          display: "flex",
          gap: "0.5rem",
          alignItems: "center",
        }}
      >
        <Button
          kind="ghost"
          size="sm"
          style={{
            color: "#161616",
            fontWeight: 400,
          }}
        >
          Login
        </Button>
        <Button
          kind="ghost"
          size="sm"
          style={{
            borderRadius: "0.5rem",
            padding: "0.5rem 1rem",
            fontWeight: 500,
          }}
          href="/get-started"
        >
          Get Started – Free
        </Button>
      </HeaderGlobalBar>
    </Header>
  );
};

export default Navbar;
