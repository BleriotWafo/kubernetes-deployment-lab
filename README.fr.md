# Kubernetes Deployment Lab

Projet DevOps de portfolio démontrant comment conteneuriser, déployer, scaler et surveiller une application full-stack avec Docker, Kubernetes et GitHub Actions.

## Langues

- [English](README.md)
- [Français](README.fr.md)
- [Deutsch](README.de.md)

---

## Présentation du projet

**Kubernetes Deployment Lab** est un projet full-stack orienté DevOps. Il a été créé pour démontrer un workflow complet allant du développement local à la conteneurisation, puis au déploiement avec Kubernetes.

Le projet comprend :

- un frontend Vue.js
- une API backend Node.js / Express
- des Dockerfiles pour le frontend et le backend
- Docker Compose pour les tests locaux
- des fichiers Kubernetes pour les Deployments, Services et la configuration
- des readiness probes et liveness probes
- des tests de scaling manuel
- une démonstration du self-healing Kubernetes
- une pipeline CI/CD avec GitHub Actions
- des images Docker publiées sur GitHub Container Registry

L’objectif du projet est de montrer des compétences DevOps pratiques dans un projet clair, réaliste et présentable dans un portfolio.

---

## Stack technique

### Frontend

- Vue.js
- Vite
- Nginx

### Backend

- Node.js
- Express.js
- API REST
- Endpoints de health check

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
- Scaling manuel
- Self-Healing

---

## Structure du projet

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

## Endpoints API

| Méthode | Endpoint | Description |
|---|---|---|
| GET | `/` | Route d’accueil de l’API |
| GET | `/health` | Vérification de santé générale |
| GET | `/health/live` | Endpoint pour la liveness probe |
| GET | `/health/ready` | Endpoint pour la readiness probe |
| GET | `/api/status` | Statut d’exécution de l’API |
| GET | `/api/info` | Informations sur le projet et le déploiement |

---

## Développement local

### Lancer le backend

```bash
cd backend
npm install
npm run dev
```

Backend :

```txt
http://localhost:4000
```

### Lancer le frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend :

```txt
http://localhost:5173
```

---

## Lancer avec Docker Compose

Depuis la racine du projet :

```bash
docker compose up --build
```

Application :

```txt
http://localhost:8080
```

Commandes utiles :

```bash
docker compose down
docker ps
docker logs k8s-lab-backend
docker logs k8s-lab-frontend
```

---

## Images Docker

Le projet publie deux images Docker sur GitHub Container Registry :

```txt
ghcr.io/bleriotwafo/kubernetes-deployment-lab-backend:latest
ghcr.io/bleriotwafo/kubernetes-deployment-lab-frontend:latest
```

---

## Déploiement Kubernetes

Appliquer tous les fichiers Kubernetes :

```bash
kubectl apply -f k8s/
```

Vérifier les ressources :

```bash
kubectl get all -n portfolio-k8s
```

Résultat attendu :

```txt
2 Pods backend
2 Pods frontend
1 Service backend
1 Service frontend
Deployment backend
Deployment frontend
```

Accès via NodePort :

```txt
http://localhost:30080
```

Alternative avec port-forward :

```bash
kubectl port-forward service/frontend 8081:80 -n portfolio-k8s
```

Puis ouvrir :

```txt
http://localhost:8081
```

---

## Scaling Kubernetes

Scaler le backend :

```bash
kubectl scale deployment backend --replicas=4 -n portfolio-k8s
```

Scaler le frontend :

```bash
kubectl scale deployment frontend --replicas=3 -n portfolio-k8s
```

Vérifier les Pods :

```bash
kubectl get pods -n portfolio-k8s
```

Revenir à l’état par défaut :

```bash
kubectl scale deployment backend --replicas=2 -n portfolio-k8s
kubectl scale deployment frontend --replicas=2 -n portfolio-k8s
```

---

## Test de self-healing

Lister les Pods :

```bash
kubectl get pods -n portfolio-k8s
```

Supprimer manuellement un Pod backend :

```bash
kubectl delete pod <backend-pod-name> -n portfolio-k8s
```

Kubernetes recrée automatiquement un nouveau Pod afin de maintenir le nombre de replicas demandé.

Observer le comportement en direct :

```bash
kubectl get pods -n portfolio-k8s -w
```

---

## Pipeline CI/CD

La pipeline GitHub Actions construit et publie les images Docker du backend et du frontend sur GitHub Container Registry.

Fichier du workflow :

```txt
.github/workflows/docker-publish.yml
```

La pipeline se lance lors de :

- push sur `main`
- pull request vers `main`
- déclenchement manuel

Elle publie :

```txt
ghcr.io/bleriotwafo/kubernetes-deployment-lab-backend:latest
ghcr.io/bleriotwafo/kubernetes-deployment-lab-frontend:latest
```

## Screenshots

### Kubernetes Frontend

![Kubernetes frontend](docs/screenshots/frontend-kubernetes.png)

### Kubernetes Resources

![kubectl get all](docs/screenshots/kubectl-get-all.png)

### GitHub Actions Pipeline

![GitHub Actions success](docs/screenshots/github-actions-success.png)

---

## Ce que ce projet démontre

Ce projet démontre :

- développement d’une application full-stack
- conteneurisation avec Docker
- orchestration locale avec Docker Compose
- Deployments et Services Kubernetes
- gestion de configuration avec ConfigMaps
- readiness probes et liveness probes
- scaling manuel des workloads
- comportement self-healing de Kubernetes
- CI/CD avec GitHub Actions
- publication d’images Docker sur GHCR

---


## Auteur

Bleriot Wafo