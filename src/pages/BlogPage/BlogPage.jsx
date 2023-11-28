import { useEffect } from "react";
import { Grid } from "semantic-ui-react";

import AddBlogForm from "../../components/AddBlogForm/AddBlogForm";
import BlogFeed from "../../components/BlogFeed/BlogFeed";

export default function BlogPage() {




    return (
        <Grid centered>
          <Grid.Row>
            <Grid.Column style={{ maxWidth: 450 }}>
              <AddBlogForm />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column style={{ maxWidth: 450 }}>
              <BlogFeed />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      );
    }