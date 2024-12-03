import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { mockOnboardingSteps } from '@/data/mock';
import { useToast } from '@/components/ui/use-toast';
import type { OnboardingStep, ChecklistItem } from '@/types';

export default function ClientCustomization() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [steps, setSteps] = useState<OnboardingStep[]>(mockOnboardingSteps);
  const [selectedStep, setSelectedStep] = useState<OnboardingStep | null>(null);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(steps);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSteps(items);
  };

  const handleStepChange = (field: keyof OnboardingStep, value: string) => {
    if (!selectedStep) return;

    const updatedStep = { ...selectedStep, [field]: value };
    setSelectedStep(updatedStep);

    const updatedSteps = steps.map(step =>
      step.id === selectedStep.id ? updatedStep : step
    );
    setSteps(updatedSteps);
  };

  const handleChecklistItemChange = (itemId: string, text: string) => {
    if (!selectedStep) return;

    const updatedChecklist = selectedStep.checklist.map(item =>
      item.id === itemId ? { ...item, text } : item
    );

    const updatedStep = { ...selectedStep, checklist: updatedChecklist };
    setSelectedStep(updatedStep);

    const updatedSteps = steps.map(step =>
      step.id === selectedStep.id ? updatedStep : step
    );
    setSteps(updatedSteps);
  };

  const handleAddChecklistItem = () => {
    if (!selectedStep) return;

    const newItem: ChecklistItem = {
      id: `${selectedStep.id}-${selectedStep.checklist.length + 1}`,
      text: '',
      isCompleted: false
    };

    const updatedStep = {
      ...selectedStep,
      checklist: [...selectedStep.checklist, newItem]
    };
    setSelectedStep(updatedStep);

    const updatedSteps = steps.map(step =>
      step.id === selectedStep.id ? updatedStep : step
    );
    setSteps(updatedSteps);
  };

  const handleRemoveChecklistItem = (itemId: string) => {
    if (!selectedStep) return;

    const updatedChecklist = selectedStep.checklist.filter(item => item.id !== itemId);
    const updatedStep = { ...selectedStep, checklist: updatedChecklist };
    setSelectedStep(updatedStep);

    const updatedSteps = steps.map(step =>
      step.id === selectedStep.id ? updatedStep : step
    );
    setSteps(updatedSteps);
  };

  const handleSave = () => {
    // Here you would typically make an API call to save the changes
    toast({
      title: "Modifications enregistrées",
      description: "Les changements ont été sauvegardés avec succès.",
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          {t('admin.customizeOnboarding')}
        </h2>
        <Button variant="gradient" onClick={handleSave}>
          {t('common.save')}
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold mb-4">
            {t('admin.onboardingSteps')}
          </h3>
          
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="steps">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-4"
                >
                  {steps.map((step, index) => (
                    <Draggable
                      key={step.id}
                      draggableId={step.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`bg-background p-4 rounded-lg cursor-move hover:bg-accent transition-colors ${
                            selectedStep?.id === step.id ? 'ring-2 ring-primary' : ''
                          }`}
                          onClick={() => setSelectedStep(step)}
                        >
                          <h4 className="font-medium">{step.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {step.description}
                          </p>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>

        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold mb-4">
            {selectedStep ? t('admin.editStep') : t('admin.selectStep')}
          </h3>
          
          {selectedStep && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  {t('admin.stepTitle')}
                </label>
                <input
                  type="text"
                  value={selectedStep.title}
                  onChange={(e) => handleStepChange('title', e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-input rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">
                  {t('admin.stepDescription')}
                </label>
                <textarea
                  value={selectedStep.description}
                  onChange={(e) => handleStepChange('description', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 bg-background border border-input rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  {t('admin.videoUrl')}
                </label>
                <input
                  type="url"
                  value={selectedStep.videoUrl}
                  onChange={(e) => handleStepChange('videoUrl', e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-input rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {t('admin.checklist')}
                </label>
                <div className="space-y-2">
                  {selectedStep.checklist.map((item) => (
                    <div key={item.id} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={item.text}
                        onChange={(e) => handleChecklistItemChange(item.id, e.target.value)}
                        className="flex-1 px-3 py-2 bg-background border border-input rounded-md"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveChecklistItem(item.id)}
                      >
                        {t('common.remove')}
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleAddChecklistItem}
                  >
                    {t('admin.addChecklistItem')}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}