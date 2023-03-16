package main

import (
	"net/http"
)

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "web/index.html")
	})

	fs := http.FileServer(http.Dir("web/assets/"))
	http.Handle("/assets/", http.StripPrefix("/assets", fs))

	if err := http.ListenAndServe(":8411", nil); err != nil {
		panic(err)
	}
}
