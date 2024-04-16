from locust import HttpUser, task, between

class MyUser(HttpUser):
    wait_time = between(1, 3)  # Wait time between requests

    @task
    def my_task(self):
        self.client.get("/path/to/endpoint")  # Make a GET request to the desired endpoint