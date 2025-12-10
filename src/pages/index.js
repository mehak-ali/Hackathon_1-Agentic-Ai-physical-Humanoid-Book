import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">Physical AI: The New Frontier of Embodied Intelligence</h1>
        <p className="hero__subtitle">From bits and bytes to atoms and actions, this book is your guide to the fascinating world of physical artificial intelligence.</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/physical-ai-book/lesson1-bits-to-atoms">
            Start Reading
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext(); // Get siteConfig here
  return (
    <Layout
      title={`Welcome to the Physical AI Book`}
      description="Learn about the exciting field of Physical AI, where robotics and artificial intelligence converge.">
      <HomepageHeader />
      <main>
        <section className={styles.features}>
          <div className="container">
            <div className="row">
              <div className={clsx('col col--12')}>
                <div className="text--center padding-horiz--md">
                  <h2>About This Book</h2>
                  <p>
                  This book is designed for students, engineers, and hobbyists who are interested in the intersection of artificial intelligence and the physical world. We will explore the fundamental concepts of how AI-powered agents perceive their environment, make decisions, and take actions. Through a series of lessons and practical examples, you will gain a comprehensive understanding of what it takes to build intelligent systems that can interact with the world around us.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
