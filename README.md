# Kubernetes Deployment Lab

A DevOps portfolio project demonstrating how to containerize, deploy, scale and monitor a full-stack application with Docker, Kubernetes and GitHub Actions.

## Languages

- [English](README.md)
- [Français](README.fr.md)
- [Deutsch](README.de.md)

---

## Project Overview

**Kubernetes Deployment Lab** is a full-stack DevOps project created to demonstrate a complete deployment workflow from local development to containerization and Kubernetes orchestration.

The project includes:

- a Vue.js frontend dashboard
- a Node.js / Express backend API
- Dockerfiles for frontend and backend
- Docker Compose for local container testing
- Kubernetes manifests for Deployments, Services and configuration
- readiness and liveness probes
- manual scaling tests
- Kubernetes self-healing demonstration
- GitHub Actions CI/CD pipeline
- Docker images published to GitHub Container Registry

The goal of this project is to show practical DevOps skills in a realistic but understandable portfolio project.

---

## Tech Stack

### Frontend

- Vue.js
- Vite
- Nginx

### Backend

- Node.js
- Express.js
- REST API
- Health check endpoints

### DevOps

- Docker
- Docker Compose
- Kubernetes
- GitHub Actions
- GitHub Container Registry
- CI/CD
- Kubernetes Deployments
- Kubernetes Services
- ConfigMaps
- Readiness Probes
- Liveness Probes
- Manual Scaling
- Self-Healing

---

## Project Structure

```txt
kubernetes-deployment-lab/
├── backend/
│   ├── src/
│   │   ├── app.js
│   │   ├── server.js
│   │   ├── routes/
│   │   └── middleware/
│   ├── Dockerfile
│   ├── package.json
│   └── .dockerignore
│
├── frontend/
│   ├── src/
│   │   ├── App.vue
│   │   ├── main.js
│   │   └── style.css
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── package.json
│   └── .dockerignore
│
├── k8s/
│   ├── namespace.yaml
│   ├── configmap.yaml
│   ├── backend-deployment.yaml
│   ├── backend-service.yaml
│   ├── frontend-deployment.yaml
│   ├── frontend-service.yaml
│   └── ingress.yaml
│
├── .github/
│   └── workflows/
│       └── docker-publish.yml
│
├── docker-compose.yml
├── README.md
├── README.fr.md
└── README.de.md
```

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | API welcome route |
| GET | `/health` | Basic health check |
| GET | `/health/live` | Liveness probe endpoint |
| GET | `/health/ready` | Readiness probe endpoint |
| GET | `/api/status` | Runtime API status |
| GET | `/api/info` | Project and deployment information |

---

## Local Development

### Start the backend

```bash
cd backend
npm install
npm run dev
```

Backend:

```txt
http://localhost:4000
```

### Start the frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend:

```txt
http://localhost:5173
```

---

## Run with Docker Compose

From the project root:

```bash
docker compose up --build
```

Application:

```txt
http://localhost:8080
```

Useful commands:

```bash
docker compose down
docker ps
docker logs k8s-lab-backend
docker logs k8s-lab-frontend
```

---

## Docker Images

The project publishes two Docker images to GitHub Container Registry:

```txt
ghcr.io/bleriotwafo/kubernetes-deployment-lab-backend:latest
ghcr.io/bleriotwafo/kubernetes-deployment-lab-frontend:latest
```

---

## Kubernetes Deployment

Apply all Kubernetes manifests:

```bash
kubectl apply -f k8s/
```

Check the resources:

```bash
kubectl get all -n portfolio-k8s
```

Expected result:

```txt
2 backend Pods
2 frontend Pods
1 backend Service
1 frontend Service
backend Deployment
frontend Deployment
```

Access the application through NodePort:

```txt
http://localhost:30080
```

Alternative with port-forward:

```bash
kubectl port-forward service/frontend 8081:80 -n portfolio-k8s
```

Then open:

```txt
http://localhost:8081
```

---

## Kubernetes Scaling

Scale the backend:

```bash
kubectl scale deployment backend --replicas=4 -n portfolio-k8s
```

Scale the frontend:

```bash
kubectl scale deployment frontend --replicas=3 -n portfolio-k8s
```

Check Pods:

```bash
kubectl get pods -n portfolio-k8s
```

Return to the default state:

```bash
kubectl scale deployment backend --replicas=2 -n portfolio-k8s
kubectl scale deployment frontend --replicas=2 -n portfolio-k8s
```

---

## Self-Healing Test

List Pods:

```bash
kubectl get pods -n portfolio-k8s
```

Delete one backend Pod manually:

```bash
kubectl delete pod <backend-pod-name> -n portfolio-k8s
```

Kubernetes automatically creates a new Pod to keep the desired number of replicas.

Watch the behavior live:

```bash
kubectl get pods -n portfolio-k8s -w
```

---

## CI/CD Pipeline

The GitHub Actions workflow builds and pushes the backend and frontend Docker images to GitHub Container Registry.

Workflow file:

```txt
.github/workflows/docker-publish.yml
```

The pipeline runs on:

- push to `main`
- pull requests to `main`
- manual workflow dispatch

It publishes:

```txt
ghcr.io/bleriotwafo/kubernetes-deployment-lab-backend:latest
ghcr.io/bleriotwafo/kubernetes-deployment-lab-frontend:latest
```

---
## Screenshots

### Kubernetes Frontend

![Kubernetes frontend](docs/screenshots/frontend-kubernetes.png)

### Kubernetes Resources

![kubectl get all](docs/screenshots/kubectl-get-all.png)

### GitHub Actions Pipeline

![GitHub Actions success](docs/screenshots/github-actions-success.png)

## What This Project Demonstrates

This project demonstrates:

- full-stack application development
- containerization with Docker
- local container orchestration with Docker Compose
- Kubernetes Deployments and Services
- configuration management with ConfigMaps
- readiness and liveness probes
- manual scaling of workloads
- Kubernetes self-healing behavior
- CI/CD with GitHub Actions
- publishing Docker images to GHCR

---


## Author

Bleriot Wafo