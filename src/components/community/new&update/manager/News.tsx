'use client';

import React, { useState } from 'react';
import {
  Stack,
  Typography,
  Button,
  TextField,
  MenuItem,
  Grid,
  CircularProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from '@mui/material';
import { useCategories } from '@/hooks/useCategories';
import { useOwnedNews, useCreateNews, usePublishNews } from '@/hooks/useNews';
import { CategoryType } from '@/types/category';
import toast from 'react-hot-toast';

const NewsManagement: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [status, setStatus] = useState<'draft' | 'published'>('draft');

  const { data: categories, isLoading: catLoading } = useCategories('news' as CategoryType);

  const { data: newsData, isLoading: newsLoading, refetch: refetchNews } = useOwnedNews();
  const ownedNews = newsData?.pages.flatMap((page) => page.data) || [];

  const createNewsMutation = useCreateNews();
  const publishNewsMutation = usePublishNews();

  const handleCreateNews = () => {
    if (!title || !description || !content || !categoryId) {
      toast.error('Vui lòng điền đầy đủ thông tin');
      return;
    }

    createNewsMutation.mutate(
      { title, description, content, categoryId, status },
      {
        onSuccess: () => {
          toast.success('Tạo news thành công!');
          setTitle('');
          setDescription('');
          setContent('');
          setCategoryId('');
          setStatus('draft');
          refetchNews();
        },
        onError: () => toast.error('Tạo news thất bại'),
      }
    );
  };

  const handlePublish = (id: number) => {
    publishNewsMutation.mutate(id, {
      onSuccess: () => {
        toast.success('News đã được công khai');
        refetchNews();
      },
      onError: () => toast.error('Công khai news thất bại'),
    });
  };

  const totalNews = ownedNews.length;
  const publishedNews = ownedNews.filter((n) => n.status === 'published').length;
  const draftNews = ownedNews.filter((n) => n.status === 'draft').length;
  const totalViews = ownedNews.reduce((sum, n) => sum + (n.views || 0), 0);

  if (catLoading || newsLoading) return <CircularProgress />;

  return (
    <Stack spacing={6} sx={{ px: 6, py: 4, minHeight: '100vh', background: '#12192b', color: '#fff' }}>
      <Typography variant="h4" sx={{ fontWeight: 800 }}>
        Quản lý News
      </Typography>

      <Grid container spacing={4}>
        {[
          { label: 'Tổng News', value: totalNews },
          { label: 'Đã xuất bản', value: publishedNews },
          { label: 'Draft', value: draftNews },
          { label: 'Tổng lượt xem', value: totalViews },
        ].map((stat) => (
          <Grid size={{ xs: 6, md: 3 }} key={stat.label}>
            <Typography sx={{ fontSize: 24, fontWeight: 700 }}>{stat.value}</Typography>
            <Typography sx={{ color: '#9b9bbf', fontSize: 14 }}>{stat.label}</Typography>
          </Grid>
        ))}
      </Grid>

      <Paper sx={{ p: 4, background: '#1e244b' }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Tạo News Mới
        </Typography>
        <Stack spacing={2}>
          {['Tiêu đề', 'Mô tả', 'Nội dung'].map((label, idx) => (
            <TextField
              key={label}
              label={label}
              value={idx === 0 ? title : idx === 1 ? description : content}
              onChange={(e) => {
                if (idx === 0) setTitle(e.target.value);
                else if (idx === 1) setDescription(e.target.value);
                else setContent(e.target.value);
              }}
              multiline={idx === 2}
              rows={idx === 2 ? 4 : 1}
              fullWidth
              InputLabelProps={{ style: { color: '#fff' } }}
              InputProps={{ style: { color: '#fff' } }}
            />
          ))}

          <TextField
            select
            label="Chọn danh mục"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            fullWidth
            InputLabelProps={{ style: { color: '#fff' } }}
            SelectProps={{ style: { color: '#fff' } }}
          >
            {categories?.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Trạng thái"
            value={status}
            onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}
            fullWidth
            InputLabelProps={{ style: { color: '#fff' } }}
            SelectProps={{ style: { color: '#fff' } }}
          >
            <MenuItem value="draft">Draft</MenuItem>
            <MenuItem value="published">Published</MenuItem>
          </TextField>

          <Button
            variant="contained"
            sx={{ background: 'linear-gradient(90deg,#7a3bff,#b78eff)', textTransform: 'none' }}
            onClick={handleCreateNews}
          >
            Tạo News
          </Button>
        </Stack>
      </Paper>

      <Paper sx={{ p: 4, background: '#1e244b' }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Bảng News
        </Typography>
        <Table sx={{ color: '#fff' }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: '#fff' }}>Tiêu đề</TableCell>
              <TableCell sx={{ color: '#fff' }}>Trạng thái</TableCell>
              <TableCell sx={{ color: '#fff' }}>Danh mục</TableCell>
              <TableCell sx={{ color: '#fff' }}>Views</TableCell>
              <TableCell sx={{ color: '#fff' }}>Ngày xuất bản</TableCell>
              <TableCell sx={{ color: '#fff' }}>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ownedNews.map((news) => (
              <TableRow key={news.id} hover>
                <TableCell sx={{ color: '#fff' }}>{news.title}</TableCell>
                <TableCell sx={{ color: '#fff' }}>{news.status}</TableCell>
                <TableCell sx={{ color: '#fff' }}>{news.category?.name || '-'}</TableCell>
                <TableCell sx={{ color: '#fff' }}>{news.views}</TableCell>
                <TableCell sx={{ color: '#fff' }}>{news.publishedAt || '-'}</TableCell>
                <TableCell>
                  {news.status === 'draft' && (
                    <Button
                      variant="outlined"
                      sx={{ color: '#fff', borderColor: '#fff', textTransform: 'none' }}
                      onClick={() => handlePublish(news.id)}
                    >
                      Công khai
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Stack>
  );
};

export default NewsManagement;
