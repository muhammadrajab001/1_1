import React, { useState, useEffect } from 'react';
import TableComponent from './com/TableComponent';
import FormComponent from './com/FormComponent ';
import CommentsComponent from './com/CommentsComponent ';
import { Container, Typography, Box, Button } from '@mui/material';
import axios from 'axios';

const App = () => {
  const [showComments, setShowComments] = useState(false);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);

  const handleAddRecord = (newRecord) => {
    if (showComments) {
      setComments((prevComments) => [...prevComments, newRecord]);
    } else {
      setPosts((prevPosts) => [...prevPosts, newRecord]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsResponse = await axios.get('http://localhost:3000/posts');
        setPosts(postsResponse.data);
        const commentsResponse = await axios.get('http://localhost:3000/comments');
        setComments(commentsResponse.data);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        ЗАДАЧКА
      </Typography>
      <Box mb={4}>
        <FormComponent onAddRecord={handleAddRecord} showComments={showComments} />
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowComments(!showComments)}
      >
        {showComments ? 'Показать посты' : 'Показать комментарии'}
      </Button>
      <Box mt={4}>
        {showComments ? (
          <CommentsComponent comments={comments} />
        ) : (
          <TableComponent data={posts} columns={['ID', 'Title', 'Body', 'Message ID']} />
        )}
      </Box>
    </Container>
  );
};

export default App;
