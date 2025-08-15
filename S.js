

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Image, TouchableOpacity } from 'react-native';

export default function App() {
  const [posts, setPosts] = useState([
    { id: '1', user: 'John', text: 'God is good all the time!', image: null, likes: 3 },
    { id: '2', user: 'Mary', text: 'Psalm 23:1 – The Lord is my shepherd.', image: null, likes: 5 }
  ]);
  const [newPost, setNewPost] = useState('');

  const addPost = () => {
    if (newPost.trim()) {
      setPosts([{ id: Date.now().toString(), user: 'You', text: newPost, image: null, likes: 0 }, ...posts]);
      setNewPost('');
    }
  };

  const likePost = (id) => {
    setPosts(posts.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#f8f8f8' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Daily Verse:</Text>
      <Text style={{ marginBottom: 20 }}>“I can do all things through Christ who strengthens me.” – Philippians 4:13</Text>

      <TextInput
        placeholder="Share a blessing..."
        value={newPost}
        onChangeText={setNewPost}
        style={{ backgroundColor: '#fff', padding: 10, borderRadius: 8, marginBottom: 10 }}
      />
      <Button title="Post" onPress={addPost} />

      <FlatList
        style={{ marginTop: 20 }}
        data={posts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={{ backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 10 }}>
            <Text style={{ fontWeight: 'bold' }}>{item.user}</Text>
            <Text>{item.text}</Text>
            {item.image && <Image source={{ uri: item.image }} style={{ width: '100%', height: 200 }} />}
            <TouchableOpacity onPress={() => likePost(item.id)}>
              <Text style={{ color: 'blue', marginTop: 5 }}>❤️ {item.likes} Likes</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

