"use client"

import { useState, useMemo } from "react"
import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { motion } from "framer-motion"
import PosterUploader from "@/components/PosterUploader"
import VideoUploader from "@/components/VideoUploader"
import ImageUploader from "@/components/ImageUploader"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

const maxLength = 160;
const titleMaxLength = 32;

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"blogs" | "episodes" | "newsletter" | "contacts" | "users">("blogs")
  const [editingItem, setEditingItem] = useState<any>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [deleteItem, setDeleteItem] = useState<{id: any, type: "blog" | "episode" | "contact"} | null>(null)

  const blogs = useQuery(api.blogs.getBlogs)
  const episodes = useQuery(api.episode.getEpisodes)
  const newsletter = useQuery(api.newsletter.getAll)
  const users = useQuery(api.users.getAllUsers)
  const contacts = useQuery(api.contacts.getContacts)
  
  const sortedBlogs = useMemo(() => {
    return blogs ? [...blogs].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ) : []
  }, [blogs])

  const sortedEpisodes = useMemo(() => {
    return episodes ? [...episodes].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ) : []
  }, [episodes])

  const createBlog = useMutation(api.blogs.createBlog)
  const deleteBlog = useMutation(api.blogs.deleteBlog)
  const createEpisode = useMutation(api.episode.createEpisode)
  const deleteEpisode = useMutation(api.episode.deleteEpisode)
  const updateBlog = useMutation(api.blogs.updateBlog)
  const updateEpisode = useMutation(api.episode.updateEpisode)
  const deleteContact = useMutation(api.contacts.deleteContact)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    imageUrl: "",
    videoUrl: "",
    posterUrl: ""
  })

  const handleSubmit = async (e: React.FormEvent, type: "blog" | "episode") => {
    e.preventDefault()
    try {
      if (type === "blog") {
        if (editingItem) {
          await updateBlog({
            id: editingItem._id,
            title: formData.title,
            description: formData.description,
            category: formData.category,
            imageUrl: formData.imageUrl
          })
        } else {
          await createBlog({
            title: formData.title,
            description: formData.description,
            category: formData.category,
            imageUrl: formData.imageUrl
          })
        }
      } else {
        if (editingItem) {
          await updateEpisode({
            id: editingItem._id,
            title: formData.title,
            description: formData.description,
            category: formData.category,
            videoUrl: formData.videoUrl,
            posterUrl: formData.posterUrl
          })
        } else {
          await createEpisode({
            title: formData.title,
            description: formData.description,
            category: formData.category,
            videoUrl: formData.videoUrl,
            posterUrl: formData.posterUrl
          })
        }
      }
      setFormData({
        title: "",
        description: "",
        category: "",
        imageUrl: "",
        videoUrl: "",
        posterUrl: ""
      })
      setIsCreating(false)
      setIsEditDialogOpen(false)
      setEditingItem(null)
    } catch (error) {
      console.error("Error creating item:", error)
    }
  }

  const handleDelete = async (id: any, type: "blog" | "episode" | "contact") => {
    setDeleteItem({ id, type })
  }

  const confirmDelete = async () => {
    if (!deleteItem) return
    try {
      if (deleteItem.type === "blog") {
        await deleteBlog({ id: deleteItem.id })
      } else if (deleteItem.type === "episode") {
        await deleteEpisode({ id: deleteItem.id })
      } else if (deleteItem.type === "contact") {
        await deleteContact({ id: deleteItem.id })
      }
      setDeleteItem(null)
    } catch (error) {
      console.error("Error deleting item:", error)
    }
  }

  const handleEdit = (item: any, type: "blog" | "episode") => {
    setEditingItem({ ...item, type })
    setFormData({
      title: item.title,
      description: item.description,
      category: item.category,
      imageUrl: item.imageUrl || "",
      videoUrl: item.videoUrl || "",
      posterUrl: item.posterUrl || ""
    })
    setIsEditDialogOpen(true)
  }

  if (!blogs || !episodes || !newsletter || !contacts || !users) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 w-full h-screen absolute z-50">
      {/* Spinner Animation */}
      <div className="w-12 h-12 border-4 border-blue-200 border-t-primary-600 rounded-full animate-spin"></div>
      <p className="text-primary font-medium animate-pulse">
        Admin dashboard is loading...
      </p>
    </div>
  )

  if (isCreating) return (
    <div className="max-w-[1720px] mx-auto w-full p-6 max-sm:p-3 min-h-screen flex flex-col items-center">
      <motion.h1 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl max-md:text-3xl max-sm:text-2xl font-bold my-8 max-md:my-6 max-sm:my-4 text-center"
      >
        Admin Dashboard
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-2xl mx-auto w-full"
      >
        <div className="flex flex-col max-sm:flex-col-reverse items-start max-sm:space-y-reverse max-sm:space-y-4 justify-between mb-8 gap-4">
          <h1 className="text-2xl max-md:text-xl max-sm:text-lg font-bold">
            Create New {activeTab === "blogs" ? "Blog" : "Episode"}
          </h1>
          <Button 
            variant="outline" 
            onClick={() => {
              setIsCreating(false)
              setEditingItem(null)
              setFormData({
                title: "",
                description: "",
                category: "",
                imageUrl: "",
                videoUrl: "",
                posterUrl: ""
              })
            }}
            className="w-full max-sm:w-full"
          >
            Cancel
          </Button>
        </div>

        <Card>
          <CardContent className="pt-6">
            <form onSubmit={(e) => handleSubmit(e, activeTab === "blogs" ? "blog" : "episode")} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 max-sm:text-xs">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-2 max-sm:p-2 border rounded-md text-sm max-sm:text-xs"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 max-sm:text-xs">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-2 max-sm:p-2 border rounded-md h-32 max-sm:h-24 text-sm max-sm:text-xs resize-none"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 max-sm:text-xs">Category</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full p-2 max-sm:p-2 border rounded-md text-sm max-sm:text-xs"
                  required
                />
              </div>

              {(activeTab === "blogs" || editingItem?.type === "blog") && (
                <div>
                  <label className="block text-sm font-medium mb-2 max-sm:text-xs">Image Upload</label>
                  <ImageUploader onUpload={(url) => setFormData({ ...formData, imageUrl: url })} />
                  {formData.imageUrl && (
                    <p className="text-sm text-green-600 mt-2 max-sm:text-xs">Image uploaded successfully!</p>
                  )}
                </div>
              )}

              {(activeTab === "episodes" || editingItem?.type === "episode") && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-2 max-sm:text-xs">Video Upload</label>
                    <VideoUploader onUpload={(url) => setFormData({ ...formData, videoUrl: url })} />
                    {formData.videoUrl && (
                      <p className="text-sm text-green-600 mt-2 max-sm:text-xs">Video uploaded successfully!</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 max-sm:text-xs">Poster Upload</label>
                    <PosterUploader onUpload={(url) => setFormData({ ...formData, posterUrl: url })} />
                    {formData.posterUrl && (
                      <p className="text-sm text-green-600 mt-2 max-sm:text-xs">Poster uploaded successfully!</p>
                    )}
                  </div>
                </>
              )}

              <div className="flex flex-col max-sm:flex-col gap-3">
                <Button type="submit" className="w-full max-sm:w-full">
                  {editingItem ? "Update" : "Create"}
                </Button>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => {
                    setIsCreating(false)
                    setEditingItem(null)
                    setFormData({
                      title: "",
                      description: "",
                      category: "",
                      imageUrl: "",
                      videoUrl: "",
                      posterUrl: ""
                    })
                  }}
                  className="w-full max-sm:w-full"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )

  return (
    <div className="max-w-[1720px] mx-auto w-full p-6 max-sm:p-3 min-h-screen flex flex-col items-center">
      <motion.h1 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl max-md:text-3xl max-sm:text-2xl font-bold my-8 max-md:my-6 max-sm:my-4 text-center"
      >
        Admin Dashboard
      </motion.h1>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap gap-2 max-sm:gap-1 mb-6 justify-center"
      >
        <Button 
          variant={activeTab === "blogs" ? "default" : "outline"}
          onClick={() => setActiveTab("blogs")}
          className="text-sm max-sm:text-xs px-3 max-sm:px-2 py-2 max-sm:py-1 h-auto"
        >
          <span className="max-sm:hidden">Blogs</span>
          <span className="sm:hidden">📝</span>
          <span className="ml-1">({sortedBlogs?.length || 0})</span>
        </Button>
        <Button 
          variant={activeTab === "episodes" ? "default" : "outline"}
          onClick={() => setActiveTab("episodes")}
          className="text-sm max-sm:text-xs px-3 max-sm:px-2 py-2 max-sm:py-1 h-auto"
        >
          <span className="max-sm:hidden">Episodes</span>
          <span className="sm:hidden">🎧</span>
          <span className="ml-1">({sortedEpisodes?.length || 0})</span>
        </Button>
        <Button 
          variant={activeTab === "newsletter" ? "default" : "outline"}
          onClick={() => setActiveTab("newsletter")}
          className="text-sm max-sm:text-xs px-3 max-sm:px-2 py-2 max-sm:py-1 h-auto"
        >
          <span className="max-sm:hidden">Users</span>
          <span className="sm:hidden">👥</span>
          <span className="ml-1">({newsletter?.length || 0})</span>
        </Button>
        <Button 
          variant={activeTab === "users" ? "default" : "outline"}
          onClick={() => setActiveTab("users")}
          className="text-sm max-sm:text-xs px-3 max-sm:px-2 py-2 max-sm:py-1 h-auto"
        >
          <span className="max-sm:hidden">All Users</span>
          <span className="sm:hidden">👤</span>
          <span className="ml-1">({users?.length || 0})</span>
        </Button>
        <Button 
          variant={activeTab === "contacts" ? "default" : "outline"}
          onClick={() => setActiveTab("contacts")}
          className="text-sm max-sm:text-xs px-3 max-sm:px-2 py-2 max-sm:py-1 h-auto"
        >
          <span className="max-sm:hidden">Messages</span>
          <span className="sm:hidden">💬</span>
          <span className="ml-1">({contacts?.length || 0})</span>
        </Button>
      </motion.div>

      {activeTab !== "newsletter" && activeTab !== "contacts" && activeTab !== "users" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <Button onClick={() => setIsCreating(true)} className="gap-2">
            Create New {activeTab === "blogs" ? "Blog" : "Episode"}
          </Button>
        </motion.div>
      )}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 max-sm:grid-cols-1 max-md:grid-cols-2 max-lg:grid-cols-2 max-xl:grid-cols-3 gap-6 max-sm:gap-4 my-6 w-full"
      >
        {activeTab === "blogs" && sortedBlogs?.map((blog) => (
          <motion.div key={blog._id} variants={itemVariants}>
            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
              <CardHeader className="p-4 max-sm:p-3">
                <div className="flex flex-col gap-3">
                  <div className="flex-1">
                    <CardTitle className="text-lg max-sm:text-base">{blog.title.length >= 32 ? blog.title.slice(0, 32) + "..." : blog.title}</CardTitle>
                    <CardDescription className="mt-2 text-sm max-sm:text-xs line-clamp-3">{blog.description.length >= 160 ? blog.description.slice(0, 160) + "..." : blog.description}</CardDescription>
                    <div className="mt-3">
                      <Badge variant="secondary" className="text-xs max-sm:text-xs">{blog.category}</Badge>
                    </div>
                  </div>
                  <div className="flex flex-row max-sm:flex-col gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEdit(blog, "blog")}
                      className="flex-1 max-sm:text-xs"
                    >
                      Edit
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleDelete(blog._id, "blog")}
                          className="flex-1 max-sm:text-xs"
                        >
                          Delete
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md max-sm:max-w-[95vw] mx-4">
                        <DialogHeader>
                          <DialogTitle className="text-lg max-sm:text-base">Confirm Delete</DialogTitle>
                          <DialogDescription className="text-sm max-sm:text-xs">
                            Are you sure you want to delete "{blog.title}"? This action cannot be undone.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="flex-col max-sm:flex-col gap-2">
                          <Button variant="outline" onClick={() => setDeleteItem(null)} className="w-full max-sm:text-xs">
                            Cancel
                          </Button>
                          <Button variant="destructive" onClick={confirmDelete} className="w-full max-sm:text-xs">
                            Delete
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardHeader>
              {blog.imageUrl && (
                <CardContent className="p-4 max-sm:p-3 pt-0">
                  <img 
                    src={blog.imageUrl} 
                    alt={blog.title}
                    className="w-full h-32 max-sm:h-24 object-cover rounded-md"
                  />
                </CardContent>
              )}
            </Card>
          </motion.div>
        ))}

        {activeTab === "episodes" && sortedEpisodes?.map((episode: any) => (
          <motion.div key={episode._id} variants={itemVariants}>
            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
              <CardHeader className="p-4 max-sm:p-3">
                <div className="flex flex-col gap-3">
                  <div className="flex-1">
                    <CardTitle className="text-lg max-sm:text-base">{episode.title.length >= 32 ? episode.title.slice(0, 32) + "..." : episode.title}</CardTitle>
                    <CardDescription className="mt-2 text-sm max-sm:text-xs line-clamp-3">{episode.description.length >= 160 ? episode.description.slice(0, 160) + "..." : episode.description}</CardDescription>
                    <div className="mt-3">
                      <Badge variant="secondary" className="text-xs max-sm:text-xs">{episode.category}</Badge>
                    </div>
                  </div>
                  <div className="flex flex-row max-sm:flex-col gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEdit(episode, "episode")}
                      className="flex-1 max-sm:text-xs"
                    >
                      Edit
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleDelete(episode._id, "episode")}
                          className="flex-1 max-sm:text-xs"
                        >
                          Delete
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md max-sm:max-w-[95vw] mx-4">
                        <DialogHeader>
                          <DialogTitle className="text-lg max-sm:text-base">Confirm Delete</DialogTitle>
                          <DialogDescription className="text-sm max-sm:text-xs">
                            Are you sure you want to delete "{episode.title}"? This action cannot be undone.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="flex-col max-sm:flex-col gap-2">
                          <Button variant="outline" onClick={() => setDeleteItem(null)} className="w-full max-sm:text-xs">
                            Cancel
                          </Button>
                          <Button variant="destructive" onClick={confirmDelete} className="w-full max-sm:text-xs">
                            Delete
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardHeader>
              {episode.posterUrl && (
                <CardContent className="p-4 max-sm:p-3 pt-0">
                  <img 
                    src={episode.posterUrl} 
                    alt={episode.title}
                    className="w-full h-32 max-sm:h-24 object-cover rounded-md"
                  />
                </CardContent>
              )}
            </Card>
          </motion.div>
        ))}

        {activeTab === "newsletter" && (
          <motion.div variants={itemVariants} className="col-span-full">
            <Card>
              <CardHeader className="p-6 max-sm:p-4">
                <CardTitle className="text-2xl max-md:text-xl max-sm:text-lg">Subscribed Users</CardTitle>
                <CardDescription className="text-sm max-sm:text-xs">
                  Users who have subscribed to your newsletter
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 max-sm:p-4 pt-0">
                {newsletter && newsletter.length > 0 ? (
                  <div className="space-y-4">
                    <div className="text-sm text-muted-foreground mb-4">
                      Total subscribers: {newsletter.length}
                    </div>
                    <div className="grid gap-4 max-sm:gap-3">
                      {newsletter.map((subscriber: any) => (
                        <div
                          key={subscriber._id}
                          className="flex flex-col max-sm:flex-col max-sm:space-y-2 items-start max-sm:items-start p-4 max-sm:p-3 border rounded-lg"
                        >
                          <div className="flex-1">
                            <p className="font-medium text-sm max-sm:text-sm break-all">{subscriber.email}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Subscribed on {new Date(subscriber.subscribedAt).toLocaleDateString()}
                            </p>
                          </div>
                          <Badge variant="secondary" className="text-xs max-sm:text-xs mt-2 max-sm:mt-0">Active</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 max-sm:py-8">
                    <p className="text-muted-foreground text-base max-sm:text-sm">
                      No subscribers yet. Users will appear here when they subscribe to newsletter.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {activeTab === "users" && (
          <motion.div variants={itemVariants} className="col-span-full">
            <Card>
              <CardHeader className="p-6 max-sm:p-4">
                <CardTitle className="text-2xl max-md:text-xl max-sm:text-lg">All Users</CardTitle>
                <CardDescription className="text-sm max-sm:text-xs">
                  Registered users in the system
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 max-sm:p-4 pt-0">
                {users && users.length > 0 ? (
                  <div className="space-y-4">
                    <div className="text-sm text-muted-foreground mb-4">
                      Total users: {users.length}
                    </div>
                    <div className="grid gap-4 max-sm:gap-3">
                      {users.map((user: any) => (
                        <div
                          key={user._id}
                          className="flex flex-col max-sm:flex-col max-sm:space-y-3 p-4 max-sm:p-3 border rounded-lg"
                        >
                          <div className="flex items-center gap-3 max-sm:gap-2">
                            {user.profileImage ? (
                              <img 
                                src={user.profileImage} 
                                alt={user.fullName || user.email}
                                className="w-10 h-10 max-sm:w-8 max-sm:h-8 rounded-full object-cover flex-shrink-0"
                              />
                            ) : (
                              <div className="w-10 h-10 max-sm:w-8 max-sm:h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                                <span className="text-gray-500 text-sm max-sm:text-xs font-semibold">
                                  {(user.fullName || user.email).charAt(0).toUpperCase()}
                                </span>
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm max-sm:text-sm truncate">
                                {user.fullName || 'No full name'}
                              </p>
                              <p className="text-xs text-muted-foreground truncate">
                                {user.email}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Joined {user._creationTime ? new Date(user._creationTime).toLocaleDateString() : 'Unknown date'}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mt-2 max-sm:mt-0">
                            <Badge variant={user.role === "admin" ? "default" : "secondary"} className="text-xs max-sm:text-xs">
                              {user.role}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 max-sm:py-8">
                    <p className="text-muted-foreground text-base max-sm:text-sm">
                      No users registered yet.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {activeTab === "contacts" && (
          <motion.div variants={itemVariants} className="col-span-full">
            <Card>
              <CardHeader className="p-6 max-sm:p-4">
                <CardTitle className="text-2xl max-md:text-xl max-sm:text-lg">Contact Messages</CardTitle>
                <CardDescription className="text-sm max-sm:text-xs">
                  Messages submitted through the contact form
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 max-sm:p-4 pt-0">
                {contacts && contacts.length > 0 ? (
                  <div className="space-y-4">
                    <div className="text-sm text-muted-foreground mb-4">
                      Total messages: {contacts.length}
                    </div>
                    <div className="grid gap-4 max-sm:gap-3">
                      {contacts.map((contact: any) => (
                        <div
                          key={contact._id}
                          className="flex flex-col p-4 max-sm:p-3 border rounded-lg"
                        >
                          <div className="flex-1">
                            <div className="flex flex-col max-sm:flex-col max-sm:space-y-2 items-start gap-2 mb-3">
                              <p className="font-medium text-sm max-sm:text-sm">{contact.name} {contact.family}</p>
                              <Badge variant="secondary" className="text-xs max-sm:text-xs">{contact.phone}</Badge>
                            </div>
                            <p className="text-xs text-muted-foreground mb-2">
                              {new Date(contact.createdAt).toLocaleDateString()} at {new Date(contact.createdAt).toLocaleTimeString()}
                            </p>
                            <p className="text-sm max-sm:text-xs leading-relaxed">{contact.message}</p>
                          </div>
                          <div className="flex gap-2 mt-4 max-sm:mt-3">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="destructive" 
                                  size="sm"
                                  onClick={() => handleDelete(contact._id, "contact")}
                                  className="text-xs max-sm:text-xs"
                                >
                                  Delete
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-md max-sm:max-w-[95vw] mx-4">
                                <DialogHeader>
                                  <DialogTitle className="text-lg max-sm:text-base">Confirm Delete</DialogTitle>
                                  <DialogDescription className="text-sm max-sm:text-xs">
                                    Are you sure you want to delete this message from {contact.name} {contact.family}? This action cannot be undone.
                                  </DialogDescription>
                                </DialogHeader>
                                <DialogFooter className="flex-col max-sm:flex-col gap-2">
                                  <Button variant="outline" onClick={() => setDeleteItem(null)} className="w-full max-sm:text-xs">
                                    Cancel
                                  </Button>
                                  <Button variant="destructive" onClick={confirmDelete} className="w-full max-sm:text-xs">
                                    Delete
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 max-sm:py-8">
                    <p className="text-muted-foreground text-base max-sm:text-sm">
                      No contact messages yet. Messages will appear here when users submit the contact form.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </motion.div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-sm:max-w-[95vw] max-sm:mx-4 max-h-[90vh] overflow-y-auto">
          <DialogHeader className="max-sm:px-2">
            <DialogTitle className="text-xl max-sm:text-lg">Edit {editingItem?.type === "blog" ? "Blog" : "Episode"}</DialogTitle>
            <DialogDescription className="text-sm max-sm:text-xs">
              Make changes to your {editingItem?.type === "blog" ? "blog" : "episode"} here.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={(e) => handleSubmit(e, editingItem?.type)} className="space-y-4 max-sm:px-2">
            <div>
              <label className="block text-sm font-medium mb-2 max-sm:text-xs">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full p-2 max-sm:p-2 border rounded-md text-sm max-sm:text-xs"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 max-sm:text-xs">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full p-2 max-sm:p-2 border rounded-md h-32 max-sm:h-24 text-sm max-sm:text-xs resize-none"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 max-sm:text-xs">Category</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full p-2 max-sm:p-2 border rounded-md text-sm max-sm:text-xs"
                required
              />
            </div>

            {editingItem?.type === "blog" && (
              <div>
                <label className="block text-sm font-medium mb-2 max-sm:text-xs">Image Upload</label>
                <ImageUploader onUpload={(url) => setFormData({ ...formData, imageUrl: url })} />
                {formData.imageUrl && (
                  <p className="text-sm text-green-600 mt-2 max-sm:text-xs">Image uploaded successfully!</p>
                )}
              </div>
            )}

            {editingItem?.type === "episode" && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2 max-sm:text-xs">Video Upload</label>
                  <VideoUploader onUpload={(url) => setFormData({ ...formData, videoUrl: url })} />
                  {formData.videoUrl && (
                    <p className="text-sm text-green-600 mt-2 max-sm:text-xs">Video uploaded successfully!</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 max-sm:text-xs">Poster Upload</label>
                  <PosterUploader onUpload={(url) => setFormData({ ...formData, posterUrl: url })} />
                  {formData.posterUrl && (
                    <p className="text-sm text-green-600 mt-2 max-sm:text-xs">Poster uploaded successfully!</p>
                  )}
                </div>
              </>
            )}

            <DialogFooter className="flex-col max-sm:flex-col gap-2 max-sm:px-2">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => {
                  setIsEditDialogOpen(false)
                  setEditingItem(null)
                  setFormData({
                    title: "",
                    description: "",
                    category: "",
                    imageUrl: "",
                    videoUrl: "",
                    posterUrl: ""
                  })
                }}
                className="w-full max-sm:text-xs"
              >
                Cancel
              </Button>
              <Button type="submit" className="w-full max-sm:text-xs">
                Update
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}