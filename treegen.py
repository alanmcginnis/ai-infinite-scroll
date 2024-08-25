import json
import sys

def simplify_tree(node):
    if 'contents' in node:
        return {
            'name': node['name'],
            'type': 'directory',
            'contents': [simplify_tree(child) for child in node['contents']]
        }
    else:
        return {
            'name': node['name'],
            'type': 'file'
        }

# Read JSON from stdin
tree_data = json.load(sys.stdin)

# Simplify the tree structure
simplified_tree = [simplify_tree(node) for node in tree_data]

# Output the simplified JSON
print(json.dumps(simplified_tree, indent=2))
