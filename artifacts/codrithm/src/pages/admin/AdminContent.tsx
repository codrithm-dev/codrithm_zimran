import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit3, Trash2, X, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { AdminSidebar } from "@/components/AdminSidebar";
import { AdminTopBar } from "@/components/AdminTopBar";
import { PageTransition } from "@/components/PageTransition";
import { CATEGORIES } from "@/data/categories";

export default function AdminContent() {
  const [items, setItems] = useState(CATEGORIES.map((c) => ({ ...c })));
  const [editing, setEditing] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const startEdit = (id: string, name: string) => { setEditing(id); setEditName(name); };
  const saveEdit = () => {
    setItems((prev) => prev.map((c) => c.id === editing ? { ...c, name: editName } : c));
    setEditing(null);
  };
  const deleteItem = (id: string) => {
    setItems((prev) => prev.filter((c) => c.id !== id));
    setDeleteConfirm(null);
  };

  return (
    <PageTransition>
      <div className="flex h-screen bg-background overflow-hidden">
        <AdminSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminTopBar title="Manage Content" />
          <main className="flex-1 overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-semibold">Categories</h2>
                <p className="text-sm text-muted-foreground">{items.length} categories total</p>
              </div>
              <Button size="sm" onClick={() => setShowAdd(true)} data-testid="button-add-content" className="glow-primary">
                <Plus className="w-4 h-4 mr-2" /> Add Category
              </Button>
            </div>

            <AnimatePresence>
              {showAdd && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-card border border-primary/30 rounded-xl p-4 mb-4"
                >
                  <div className="flex items-center gap-3">
                    <Input
                      placeholder="Category name"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      data-testid="input-new-category-name"
                      className="flex-1"
                    />
                    <Button size="sm" onClick={() => { if (newName) { setItems([...items, { id: `cat-${Date.now()}`, name: newName, icon: "Code2", description: "New category", memberCount: 0, difficulty: "Beginner", color: "#6366f1", accent: "from-indigo-500 to-purple-600", resources: [], projects: [] }]); setNewName(""); setShowAdd(false); } }} data-testid="button-save-new-category">
                      <Save className="w-4 h-4 mr-1" /> Save
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setShowAdd(false)}><X className="w-4 h-4" /></Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="bg-card border border-card-border rounded-xl overflow-hidden">
              <table className="w-full text-sm" data-testid="table-content">
                <thead className="border-b border-border bg-muted/30">
                  <tr>
                    <th className="text-left py-3 px-4 text-xs text-muted-foreground font-medium">Category</th>
                    <th className="text-left py-3 px-4 text-xs text-muted-foreground font-medium hidden sm:table-cell">Difficulty</th>
                    <th className="text-left py-3 px-4 text-xs text-muted-foreground font-medium hidden md:table-cell">Members</th>
                    <th className="text-right py-3 px-4 text-xs text-muted-foreground font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((cat, i) => (
                    <motion.tr
                      key={cat.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: i * 0.03 }}
                      className="border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors"
                      data-testid={`row-content-${cat.id}`}
                    >
                      <td className="py-3 px-4">
                        {editing === cat.id ? (
                          <Input
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="h-7 text-xs max-w-48"
                            autoFocus
                          />
                        ) : (
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                            <span className="font-medium text-xs">{cat.name}</span>
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4 hidden sm:table-cell">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          cat.difficulty === "Beginner" ? "text-emerald-400 bg-emerald-400/10" :
                          cat.difficulty === "Intermediate" ? "text-amber-400 bg-amber-400/10" :
                          "text-rose-400 bg-rose-400/10"
                        }`}>
                          {cat.difficulty}
                        </span>
                      </td>
                      <td className="py-3 px-4 hidden md:table-cell text-xs text-muted-foreground">
                        {cat.memberCount.toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-end gap-1">
                          {editing === cat.id ? (
                            <>
                              <Button size="sm" variant="ghost" onClick={saveEdit} className="h-7 px-2 text-xs text-chart-3 hover:text-chart-3">
                                <Save className="w-3.5 h-3.5" />
                              </Button>
                              <Button size="sm" variant="ghost" onClick={() => setEditing(null)} className="h-7 px-2">
                                <X className="w-3.5 h-3.5" />
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button size="sm" variant="ghost" onClick={() => startEdit(cat.id, cat.name)} className="h-7 px-2 text-muted-foreground hover:text-foreground" data-testid={`button-edit-${cat.id}`}>
                                <Edit3 className="w-3.5 h-3.5" />
                              </Button>
                              <Button size="sm" variant="ghost" onClick={() => setDeleteConfirm(cat.id)} className="h-7 px-2 text-muted-foreground hover:text-destructive" data-testid={`button-delete-${cat.id}`}>
                                <Trash2 className="w-3.5 h-3.5" />
                              </Button>
                            </>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            <AnimatePresence>
              {deleteConfirm && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center z-50"
                  onClick={() => setDeleteConfirm(null)}
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-card border border-card-border rounded-2xl p-6 max-w-sm mx-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <h3 className="font-semibold mb-2">Delete Category?</h3>
                    <p className="text-sm text-muted-foreground mb-4">This action cannot be undone.</p>
                    <div className="flex gap-3">
                      <Button variant="outline" className="flex-1" onClick={() => setDeleteConfirm(null)}>Cancel</Button>
                      <Button variant="destructive" className="flex-1" onClick={() => deleteItem(deleteConfirm)} data-testid="button-confirm-delete">Delete</Button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>
    </PageTransition>
  );
}
