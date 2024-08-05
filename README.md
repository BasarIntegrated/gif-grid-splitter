# GIF Grid Splitter

GIF Grid Splitter is a `Next.js` application that splits an animated GIF into a grid of smaller animated GIFs. It utilizes `ImageMagick` for image processing, `BullMQ` for background job management, and `react-query` for real-time status updates.

#### Recordings: https://www.awesomescreenshot.com/video/30199652?key=e6471f7d1470cac90d509e981f2ef990

## Setup and Running Instructions

### Prerequisites

- **Docker**: Ensure Docker is installed on your system. [Install Docker](https://docs.docker.com/get-docker/).
- **Docker Compose**: Ensure Docker Compose is installed for managing multi-container setups. [Install Docker Compose](https://docs.docker.com/compose/install/).

### Clone the Repository

```shell
git clone https://github.com/BasarIntegrated/gif-grid-splitter
cd gif-grid-splitter
```

### Run the Application

To build the Docker images and start the application along with the required services, use Docker Compose:

```shell
docker-compose up
```

This command will start the application, PostgreSQL, and Redis containers. Access the application through http://localhost:3000.

### Dependencies and Libraries Used

#### Node.js Dependencies

- next: React framework for server-side rendering and static site generation.
- react: JavaScript library for building user interfaces.
- bullmq: Library for handling background jobs and queues.
- react-query: Library for managing server state and providing real-time updates.

### System Libraries

- pkg-config: Tool for managing compiler and linker flags.
- libcairo2-dev: Library for vector graphics.
- libpango1.0-dev: Library for text layout and rendering.
- libpng-dev: Library for PNG image format.
- libjpeg-dev: Library for JPEG image format.
- libgif-dev: Library for GIF image format.
- librsvg2-dev: Library for SVG image format.
- imagemagick: Software suite for creating, editing, and converting bitmap images.

### Approach and Challenges

#### Approach

1. Containerization: Docker and Docker Compose are used to containerize the application and its dependencies, ensuring a consistent environment across development and production. Docker Compose manages PostgreSQL and Redis services required by the application.

2. Image Processing: ImageMagick was selected for its powerful and flexible image manipulation capabilities. Custom scripts handle the splitting of GIFs into smaller grids.

3. Background Processing: BullMQ is used to manage resource-intensive image processing tasks in the background, keeping the main application responsive.

4. Reactive Interface: react-query provides real-time updates on image processing status, enhancing user experience with immediate feedback.

5. Concurrency: Next.js's built-in instrumentation allows efficient handling of background tasks alongside the main application server, ensuring smooth operation.

#### Challenges

1. Custom Image Processing: Implementing custom image splitting with ImageMagick provided flexibility but added complexity compared to using existing libraries.

2. Managing Background Tasks: Integrating BullMQ for background job processing was crucial for handling resource-heavy tasks without affecting application performance.

3. Real-time Status Updates: react-query was utilized for real-time status updates, requiring careful integration to ensure accurate and timely feedback.

4. Displaying Split GIFs: Properly displaying and synchronizing split GIFs in a grid format presented challenges in layout and animation rendering.

5. Concurrency Management: Efficiently managing concurrency between the Next.js application and worker scripts required leveraging Next.js's concurrency features.
