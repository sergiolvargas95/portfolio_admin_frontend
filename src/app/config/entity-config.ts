interface EntityConfig {
  fields: string[];
  title: string;
}

export const entityConfig: { [key: string]: EntityConfig } = {
  projects: {
    fields: ['title', 'description', 'repository_url'],
    title: 'Proyecto',
  },
  technologies: {
    fields: ['name', 'level'],
    title: 'Tecnología',
  }
};