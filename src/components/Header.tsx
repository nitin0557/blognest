import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Navbar, Container, Form, FormControl } from 'react-bootstrap';
import { filterBlogs } from '../store/reducers/blogSlice';
import { AppDispatch } from '../store';

const Header: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setSearchTerm(text);
  }, []);

  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      dispatch(filterBlogs(searchTerm));
    }, 300);

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [searchTerm, dispatch]);

  return (
    <Navbar bg="dark" variant="dark" fixed="top" expand="lg" className="shadow">
      <Container>
        <Navbar.Brand href="/blognest" className="fw-bold">
          BlogSite
        </Navbar.Brand>

        <Form className="d-flex ms-auto" role="search">
          <FormControl
            type="search"
            placeholder="Search blogs..."
            className="me-2"
            aria-label="Search"
            value={searchTerm}
            onChange={handleSearch}
            autoComplete="off"
          />
        </Form>
      </Container>
    </Navbar>
  );
};

export default Header;
