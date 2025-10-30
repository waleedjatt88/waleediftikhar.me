import React, { useEffect } from 'react';
import AOS from 'aos';
import '../blogs/Blogs.css'; 
import blogImage1 from '../../assets/image_8.jpg';
import blogImage2 from '../../assets/image_2.jpg';
import blogImage3 from '../../assets/image_3.jpg';

const blogPosts = [
  { 
    image: blogImage1, 
    title: 'Why Lead Generation is Key for Business Growth',
    excerpt: 'Discover strategies to attract and convert prospects, fueling your business expansion.' 
  },
  { 
    image: blogImage2, 
    title: 'Exploring Modern JavaScript Frameworks & Libraries',
    excerpt: 'A deep dive into how React, Vue, and Svelte are shaping future of web development.'
  },
  { 
    image: blogImage3, 
    title: 'Boosting Site Performance with a Headless CMS',
    excerpt: 'Learn how decoupling your frontend and backend can lead to faster, more secure websites.'
  },
];

const Blog = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section id="blog" className="blog-section">
      <div className="container">
        <span className="background-text-blog">Blog</span>
        
        <div className="section-header-blog" data-aos="fade-down">
          <h2><span id='ourspan'>Our</span> Blog</h2>
          <p>"Explore our blog for fresh tutorials, insights, and inspiration on modern web development".</p>
        </div>

        <div className="blog-grid" data-aos="fade-up">
          {blogPosts.map((post, index) => (
            <div className="blog-card" key={index}>
              <a href="#" className="blog-image-link">
                <img src={post.image} alt={post.title} loading="lazy" />
              </a>
              <div className="blog-content">
                

                <h3 className="blog-title">
                  <a href="#">{post.title}</a>
                </h3>
                <p className="blog-excerpt">
                  {post.excerpt} 
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;