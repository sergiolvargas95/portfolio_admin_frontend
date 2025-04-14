interface EntityConfig {
  fields: string[];
  title: string;
}

export const entityConfig: { [key: string]: EntityConfig } = {
  projects: {
    fields: ['image', 'title', 'description', 'repository_url', 'demo_url'],
    title: 'Proyect',
  },
  technologies: {
    fields: ['image', 'title'],
    title: 'Technology',
  }
};